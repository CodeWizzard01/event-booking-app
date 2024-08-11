import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Artist = {
  __typename?: 'Artist';
  bio: Scalars['String']['output'];
  events: Array<Event>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  bookingDate: Scalars['DateTimeISO']['output'];
  event: EventDetail;
  eventId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  tickets: Array<Ticket>;
  userId: Scalars['Int']['output'];
};

export type BookingInput = {
  eventId: Scalars['Int']['input'];
  seats: Array<Scalars['Int']['input']>;
};

export type EventDetail = {
  __typename?: "Event";
  artists: Array<Artist>;
  category: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  eventDate: Scalars["DateTimeISO"]["output"];
  id: Scalars["ID"]["output"];
  imageUrl: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  venue: Venue;
  venueId: Scalars["Int"]["output"];
};

export type EventInput = {
  artistIds: Array<Scalars['Int']['input']>;
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  eventDate: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  venueId: Scalars['Int']['input'];
};

export type EventSeatAvailability = {
  __typename?: 'EventSeatAvailability';
  eventId: Scalars['Int']['output'];
  seatNos: Array<Scalars['Int']['output']>;
  seatsAvailable: Scalars['Int']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginToken = {
  __typename?: 'LoginToken';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Booking;
  createEvent: Event;
  createUser: User;
  createVenue: Venue;
  login: LoginToken;
  refreshToken: Scalars['String']['output'];
};


export type MutationCreateBookingArgs = {
  bookingInput: BookingInput;
};


export type MutationCreateEventArgs = {
  eventInput: EventInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationCreateVenueArgs = {
  venueInput: VenueInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allBookings: Array<Booking>;
  artists: Array<Artist>;
  bookings: Array<Booking>;
  event: Event;
  eventSeatAvailability: EventSeatAvailability;
  events: Array<Event>;
  venue: Venue;
  venues: Array<Venue>;
};


export type QueryBookingsArgs = {
  eventId: Scalars['Float']['input'];
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventSeatAvailabilityArgs = {
  eventId: Scalars['Float']['input'];
};


export type QueryVenueArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  eventSeatAvailabilityNotification?: Maybe<EventSeatAvailability>;
};


export type SubscriptionEventSeatAvailabilityNotificationArgs = {
  eventId: Scalars['Int']['input'];
};

export type Ticket = {
  __typename?: 'Ticket';
  booking: Booking;
  bookingId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  seatNo: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
};

export type Venue = {
  __typename?: 'Venue';
  address: Scalars['String']['output'];
  capacity: Scalars['Int']['output'];
  events: Array<Event>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  weather: Weather;
};

export type VenueInput = {
  address: Scalars['String']['input'];
  capacity: Scalars['Float']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Weather = {
  __typename?: 'Weather';
  description: Scalars['String']['output'];
  feels_like: Scalars['Float']['output'];
  humidity: Scalars['Float']['output'];
  icon: Scalars['String']['output'];
  main: Scalars['String']['output'];
  temp: Scalars['Float']['output'];
  temp_max: Scalars['Float']['output'];
  temp_min: Scalars['Float']['output'];
  windSpeed: Scalars['String']['output'];
};

export type ArtistListQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistListQuery = { __typename?: 'Query', artists: Array<{ __typename?: 'Artist', id: string, name: string }> };

export type CreateBookingMutationVariables = Exact<{
  bookingInput: BookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', id: string } };

export type BookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsQuery = { __typename?: 'Query', allBookings: Array<{ __typename?: 'Booking', id: string, bookingDate: any, price: number, event: { __typename?: 'Event', name: string }, tickets: Array<{ __typename?: 'Ticket', seatNo: number }> }> };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', category: string, description: string, eventDate: any, id: string, name: string, imageUrl: string, artists: Array<{ __typename?: 'Artist', id: string, name: string, bio: string }>, venue: { __typename?: 'Venue', name: string, address: string, capacity: number, id: string, location: string, weather: { __typename?: 'Weather', description: string, feels_like: number } } }> };

export type CreateEventMutationVariables = Exact<{
  eventInput: EventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', id: string } };

export type EventByIdQueryVariables = Exact<{
  eventId: Scalars['ID']['input'];
}>;


export type EventByIdQuery = { __typename?: 'Query', event: { __typename?: 'Event', category: string, description: string, eventDate: any, imageUrl: string, name: string, artists: Array<{ __typename?: 'Artist', bio: string, imageUrl: string, name: string }>, venue: { __typename?: 'Venue', address: string, capacity: number, location: string, name: string, weather: { __typename?: 'Weather', description: string, feels_like: number, humidity: number, temp: number, temp_max: number, temp_min: number, main: string, icon: string, windSpeed: string } } } };

export type EventSeatAvailabilityQueryVariables = Exact<{
  eventId: Scalars['Float']['input'];
}>;


export type EventSeatAvailabilityQuery = { __typename?: 'Query', eventSeatAvailability: { __typename?: 'EventSeatAvailability', eventId: number, seatNos: Array<number>, seatsAvailable: number } };

export type CreatUserMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type CreatUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginToken', accessToken: string, refreshToken: string } };

export type VenueListQueryVariables = Exact<{ [key: string]: never; }>;


export type VenueListQuery = { __typename?: 'Query', venues: Array<{ __typename?: 'Venue', name: string, id: string, address: string, capacity: number }> };


export const ArtistListDocument = gql`
    query artistList {
  artists {
    id
    name
  }
}
    `;

/**
 * __useArtistListQuery__
 *
 * To run a query within a React component, call `useArtistListQuery` and pass it any options that fit your needs.
 * When your component renders, `useArtistListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArtistListQuery({
 *   variables: {
 *   },
 * });
 */
export function useArtistListQuery(baseOptions?: Apollo.QueryHookOptions<ArtistListQuery, ArtistListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArtistListQuery, ArtistListQueryVariables>(ArtistListDocument, options);
      }
export function useArtistListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArtistListQuery, ArtistListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArtistListQuery, ArtistListQueryVariables>(ArtistListDocument, options);
        }
export function useArtistListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ArtistListQuery, ArtistListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ArtistListQuery, ArtistListQueryVariables>(ArtistListDocument, options);
        }
export type ArtistListQueryHookResult = ReturnType<typeof useArtistListQuery>;
export type ArtistListLazyQueryHookResult = ReturnType<typeof useArtistListLazyQuery>;
export type ArtistListSuspenseQueryHookResult = ReturnType<typeof useArtistListSuspenseQuery>;
export type ArtistListQueryResult = Apollo.QueryResult<ArtistListQuery, ArtistListQueryVariables>;
export const CreateBookingDocument = gql`
    mutation createBooking($bookingInput: BookingInput!) {
  createBooking(bookingInput: $bookingInput) {
    id
  }
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      bookingInput: // value for 'bookingInput'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const BookingsDocument = gql`
    query bookings {
  allBookings {
    id
    bookingDate
    event {
      name
    }
    price
    tickets {
      seatNo
    }
  }
}
    `;

/**
 * __useBookingsQuery__
 *
 * To run a query within a React component, call `useBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookingsQuery(baseOptions?: Apollo.QueryHookOptions<BookingsQuery, BookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingsQuery, BookingsQueryVariables>(BookingsDocument, options);
      }
export function useBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingsQuery, BookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingsQuery, BookingsQueryVariables>(BookingsDocument, options);
        }
export function useBookingsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<BookingsQuery, BookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BookingsQuery, BookingsQueryVariables>(BookingsDocument, options);
        }
export type BookingsQueryHookResult = ReturnType<typeof useBookingsQuery>;
export type BookingsLazyQueryHookResult = ReturnType<typeof useBookingsLazyQuery>;
export type BookingsSuspenseQueryHookResult = ReturnType<typeof useBookingsSuspenseQuery>;
export type BookingsQueryResult = Apollo.QueryResult<BookingsQuery, BookingsQueryVariables>;
export const EventsDocument = gql`
    query events {
  events {
    category
    category
    description
    eventDate
    id
    name
    imageUrl
    artists {
      id
      name
      bio
    }
    venue {
      name
      address
      capacity
      id
      location
      weather {
        description
        feels_like
      }
    }
  }
}
    `;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export function useEventsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsSuspenseQueryHookResult = ReturnType<typeof useEventsSuspenseQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const CreateEventDocument = gql`
    mutation createEvent($eventInput: EventInput!) {
  createEvent(eventInput: $eventInput) {
    id
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      eventInput: // value for 'eventInput'
 *   },
 * });
 */
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const EventByIdDocument = gql`
    query eventById($eventId: ID!) {
  event(id: $eventId) {
    artists {
      bio
      imageUrl
      name
    }
    category
    description
    eventDate
    imageUrl
    name
    venue {
      address
      capacity
      location
      name
      weather {
        description
        feels_like
        humidity
        temp
        temp_max
        temp_min
        main
        icon
        windSpeed
      }
    }
  }
}
    `;

/**
 * __useEventByIdQuery__
 *
 * To run a query within a React component, call `useEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventByIdQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventByIdQuery(baseOptions: Apollo.QueryHookOptions<EventByIdQuery, EventByIdQueryVariables> & ({ variables: EventByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
      }
export function useEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
        }
export function useEventByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
        }
export type EventByIdQueryHookResult = ReturnType<typeof useEventByIdQuery>;
export type EventByIdLazyQueryHookResult = ReturnType<typeof useEventByIdLazyQuery>;
export type EventByIdSuspenseQueryHookResult = ReturnType<typeof useEventByIdSuspenseQuery>;
export type EventByIdQueryResult = Apollo.QueryResult<EventByIdQuery, EventByIdQueryVariables>;
export const EventSeatAvailabilityDocument = gql`
    query EventSeatAvailability($eventId: Float!) {
  eventSeatAvailability(eventId: $eventId) {
    eventId
    seatNos
    seatsAvailable
  }
}
    `;

/**
 * __useEventSeatAvailabilityQuery__
 *
 * To run a query within a React component, call `useEventSeatAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventSeatAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventSeatAvailabilityQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventSeatAvailabilityQuery(baseOptions: Apollo.QueryHookOptions<EventSeatAvailabilityQuery, EventSeatAvailabilityQueryVariables> & ({ variables: EventSeatAvailabilityQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventSeatAvailabilityQuery, EventSeatAvailabilityQueryVariables>(EventSeatAvailabilityDocument, options);
      }
export function useEventSeatAvailabilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventSeatAvailabilityQuery, EventSeatAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventSeatAvailabilityQuery, EventSeatAvailabilityQueryVariables>(EventSeatAvailabilityDocument, options);
        }
export function useEventSeatAvailabilitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EventSeatAvailabilityQuery, EventSeatAvailabilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventSeatAvailabilityQuery, EventSeatAvailabilityQueryVariables>(EventSeatAvailabilityDocument, options);
        }
export type EventSeatAvailabilityQueryHookResult = ReturnType<typeof useEventSeatAvailabilityQuery>;
export type EventSeatAvailabilityLazyQueryHookResult = ReturnType<typeof useEventSeatAvailabilityLazyQuery>;
export type EventSeatAvailabilitySuspenseQueryHookResult = ReturnType<typeof useEventSeatAvailabilitySuspenseQuery>;
export type EventSeatAvailabilityQueryResult = Apollo.QueryResult<EventSeatAvailabilityQuery, EventSeatAvailabilityQueryVariables>;
export const CreatUserDocument = gql`
    mutation creatUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    id
  }
}
    `;
export type CreatUserMutationFn = Apollo.MutationFunction<CreatUserMutation, CreatUserMutationVariables>;

/**
 * __useCreatUserMutation__
 *
 * To run a mutation, you first call `useCreatUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [creatUserMutation, { data, loading, error }] = useCreatUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useCreatUserMutation(baseOptions?: Apollo.MutationHookOptions<CreatUserMutation, CreatUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatUserMutation, CreatUserMutationVariables>(CreatUserDocument, options);
      }
export type CreatUserMutationHookResult = ReturnType<typeof useCreatUserMutation>;
export type CreatUserMutationResult = Apollo.MutationResult<CreatUserMutation>;
export type CreatUserMutationOptions = Apollo.BaseMutationOptions<CreatUserMutation, CreatUserMutationVariables>;
export const LoginDocument = gql`
    mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const VenueListDocument = gql`
    query venueList {
  venues {
    name
    id
    address
    capacity
  }
}
    `;

/**
 * __useVenueListQuery__
 *
 * To run a query within a React component, call `useVenueListQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenueListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenueListQuery({
 *   variables: {
 *   },
 * });
 */
export function useVenueListQuery(baseOptions?: Apollo.QueryHookOptions<VenueListQuery, VenueListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenueListQuery, VenueListQueryVariables>(VenueListDocument, options);
      }
export function useVenueListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenueListQuery, VenueListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenueListQuery, VenueListQueryVariables>(VenueListDocument, options);
        }
export function useVenueListSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<VenueListQuery, VenueListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VenueListQuery, VenueListQueryVariables>(VenueListDocument, options);
        }
export type VenueListQueryHookResult = ReturnType<typeof useVenueListQuery>;
export type VenueListLazyQueryHookResult = ReturnType<typeof useVenueListLazyQuery>;
export type VenueListSuspenseQueryHookResult = ReturnType<typeof useVenueListSuspenseQuery>;
export type VenueListQueryResult = Apollo.QueryResult<VenueListQuery, VenueListQueryVariables>;