"use server";

import { getClient } from "@/graphql/apollo-client";
import {
  ArtistListDocument,
  CreateEventDocument,
  EventInput,
  VenueListDocument,
} from "@/graphql/generated/graphql";
import { ApolloError } from "@apollo/client";
import { revalidatePath } from "next/cache";

export async function getVenues() {
  const data = await getClient().query({ query: VenueListDocument });
  return data.data.venues;
}

export async function getArtists() {
  const data = await getClient().query({ query: ArtistListDocument });
  return data.data.artists;
}

export async function createEvent(
  prevState: any,
  formData: FormData
): Promise<{
  message: string | null;
  eventCreationSuccess: boolean;
  resetKey: string | null;
}> {
  const eventInput: EventInput = {
    name: formData.get("name")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    eventDate: formData.get("eventDate")?.toString() ?? "",
    artistIds: (formData.get("selectedArtists")?.toString() ?? "")
      .split(",")
      .map((id) => parseInt(id)),
    venueId: parseInt(formData.get("venueId")?.toString() ?? ""),
    category: formData.get("category")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() ?? "",
  };
  try {
    const response = await getClient().mutate({
      mutation: CreateEventDocument,
      variables: { eventInput },
    });
    revalidatePath("/");
    return {
      message: null,
      eventCreationSuccess: true,
      resetKey: Date.now().toString(),
    };
  } catch (error) {
    var errorMessage = "Error creating event";
    if (error instanceof ApolloError) {
      if (error.graphQLErrors.length > 0) {
        error.graphQLErrors.forEach(({ message }) => {
          errorMessage += ` - ${message}`;
        });
      }
    }

    return {
      message: errorMessage,
      eventCreationSuccess: false,
      resetKey: Date.now().toString(),
    };
  }
}
