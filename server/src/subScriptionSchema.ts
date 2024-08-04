import { makeExecutableSchema } from "@graphql-tools/schema";
import { withFilter } from "graphql-subscriptions";
import { EVENT_BOOKING_CREATED } from "./constants/constants.js";
import { pubSub } from "./pub-sub.js";

const typeDefs = `#graphql
  type Subscription{
    eventSeatAvailabilityNotification(eventId: Int!): EventSeatAvailability    
  }

  type EventSeatAvailability{
    eventId: Int!
    seatsAvailable: Int!
    seatNos: [Int]!
  }
`;
const resolvers = {
  Subscription: {
    eventSeatAvailabilityNotification: {
      subscribe: withFilter(
        () => pubSub.asyncIterator([EVENT_BOOKING_CREATED]),
        (payload, variables, context) => {
          return payload.eventSeatAvailabilityNotification.eventId === variables.eventId;
        }
      ),
    }
  }
};
export const subScriptionSchema = makeExecutableSchema({ typeDefs, resolvers });
