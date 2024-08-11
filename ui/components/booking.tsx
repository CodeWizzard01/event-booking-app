import { getClient } from '@/graphql/apollo-client';
import { EventSeatAvailability, EventSeatAvailabilityDocument } from '@/graphql/generated/graphql';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import SeatSelection from './seat-selection';

export default async function Booking({ eventId }: { eventId: string }) {
    const data = await getClient().query({
        query: EventSeatAvailabilityDocument,
        variables: { eventId: parseInt(eventId) },
    });
    const eventSeatAvailability: EventSeatAvailability =
        data.data.eventSeatAvailability;
    const { seatNos, seatsAvailable } = eventSeatAvailability;

    const allSeats = Array.from({ length: seatsAvailable }, (_, i) => i + 1);

    const rows = [];
    for (let i = 0; i < allSeats.length; i += 20) {
        rows.push(allSeats.slice(i, i + 20));
    }

    //await new Promise((resolve) => setTimeout(resolve, 5000));
    
    return (
      <Card id="bookingCard">
        <CardHeader>
          <CardTitle>Book Seats</CardTitle>
        </CardHeader>
        <CardContent>
          <SeatSelection rows={rows} seatNos={seatNos} eventId={eventId} />
        </CardContent>
      </Card>
    );
}
