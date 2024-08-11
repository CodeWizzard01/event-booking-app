'use server';

import { getClient } from "@/graphql/apollo-client";
import { Booking, BookingInput, CreateBookingDocument } from "@/graphql/generated/graphql";
import { ApolloError } from "@apollo/client";
import { revalidatePath } from "next/cache";


export async function createBooking(eventId: number, selectedSeats: number[]): Promise<{ message: string | null, bookingSuccess: boolean }> {
    const bookingInput: BookingInput = {
      eventId,
      seats: selectedSeats,
    };
    await new Promise((resolve) => setTimeout(resolve, 3000));  
    try {
      const response = await getClient().mutate({
        mutation: CreateBookingDocument,
        variables: { bookingInput },
      });
      revalidatePath(`/events/${eventId}`);
      return {
        message: null,
        bookingSuccess: true,
      };
    } catch (error) {
      var errorMessage = "Error creating booking";
      if (error instanceof ApolloError) {
        if (error.graphQLErrors.length > 0) {
          error.graphQLErrors.forEach(({ message }) => {
            errorMessage += ` - ${message}`;
          });
        }
      }
      return {
        message: errorMessage,
        bookingSuccess: false,
      };
    }
}