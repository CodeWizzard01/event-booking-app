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

const PORT = 3000;
const app = express();

const eventResolver = new EventResolver();

const authChecker: AuthChecker<AppContext> = ({ context },roles) => {
  return context?.userContext?.id &&
    (roles.length===0 || roles.includes(context.userContext.role));
};

const schema = await buildSchema({
    resolvers: [EventResolver, VenueResolver,UserResolver,BookingResolver], 
    emitSchemaFile: true,
    authChecker
});
    
const server = new ApolloServer({schema});

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

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`)
});