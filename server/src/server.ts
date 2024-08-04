import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { Event } from './types/types.js';
import { EventResolver } from './resolvers/event-resolver.js';
import { buildSchema } from 'type-graphql';
import { VenueResolver } from './resolvers/venue-resolver.js';

const PORT = 3000;
const app = express();

const eventResolver = new EventResolver();

const schema = await buildSchema({
    resolvers: [EventResolver, VenueResolver], 
    emitSchemaFile: true
});
    
const server = new ApolloServer({schema});

await server.start();

app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}/graphql`)
});