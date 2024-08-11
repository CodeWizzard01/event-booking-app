import Artists from '@/components/artists';
import Booking from '@/components/booking';
import SkeletonBooking from '@/components/booking-skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import WeatherCard from '@/components/weather';
import { getClient } from '@/graphql/apollo-client';
import { EventByIdDocument, EventDetail } from '@/graphql/generated/graphql';
import Image from 'next/image';
import React, { Suspense } from 'react'

export default async function EventDetail({ params }: { params: {id:string} }) {
    const data = await getClient().query({ query: EventByIdDocument, variables: { eventId: params.id } });
    const eventData:EventDetail = data.data.event;
    const eventDate = eventData.eventDate.split("T")[0];
    return (
      <Card id="mainCard">
        <CardHeader>
          <CardTitle>{eventData.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-5 p-5">
            <Card id="eventCard">
              <CardHeader>
                <CardTitle>Event Summary</CardTitle>
              </CardHeader>
              <Image
                className="m-5"
                src={eventData.imageUrl}
                alt=""
                width={800}
                height={300}
              />
              <CardContent>
                <Typography element="p" as="p">
                  {eventData.description}
                </Typography>
                <Typography
                  element="p"
                  as="p"
                >{`Date : ${eventDate}`}</Typography>
                <Typography element="p" as="p">
                  {eventData.venue.name}, {eventData.venue.address}
                </Typography>
              </CardContent>
            </Card>
            <div className="grid grid-rows-2 gap-3">
              <Suspense fallback={<SkeletonBooking/>}>
                <Booking eventId={params.id} />
              </Suspense>
              <Artists artists={eventData.artists} />
            </div>
            <WeatherCard weather={eventData.venue.weather} />
          </div>
        </CardContent>
      </Card>
    );
}
