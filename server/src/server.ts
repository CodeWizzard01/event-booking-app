import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { AppContext, Event, UserContext } from './types/types.js';
import { EventResolver } from './resolvers/event-resolver.js';
import { AuthChecker, buildSchema } from 'type-graphql';
import { VenueResolver } from './resolvers/venue-resolver.js';
import { UserResolver } from './resolvers/user-resolver.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants/constants.js';
import { BookingResolver } from './resolvers/booking-resolver.js';

import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { mergeSchemas } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { subScriptionSchema } from './subScriptionSchema.js';

const PORT = 3000;
const app = express();

const httpServer = createServer(app);


const authChecker: AuthChecker<AppContext> = ({ context },roles) => {
  return context?.userContext?.id &&
    (roles.length===0 || roles.includes(context.userContext.role));
};

const typeGraphQLSchema = await buildSchema({
    resolvers: [EventResolver, VenueResolver,UserResolver,BookingResolver], 
    emitSchemaFile: true,
    authChecker
});

const schema = mergeSchemas({schemas: [typeGraphQLSchema,subScriptionSchema]});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ 
  schema, 
  onConnect: (context) => {
    const authorization = context.connectionParams.Authorization || '';
    try {
        const userContext = jwt.verify(authorization, JWT_SECRET);
        return {userContext};
    }
    catch (e) {
      throw new Error('Not authenticated');          
    }
},
}, wsServer);
    
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],

});

await server.start();

const options =   {
  context:
    async ({ req }):Promise<AppContext> => {
      const token = req.headers.authorization || '';
      try {
        const userContext:UserContext = jwt.verify(token, JWT_SECRET);
        return {userContext};
      } catch (e) {
        return {userContext:null};
      }     
    }
  };

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server,options));

httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`)
});