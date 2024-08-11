import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { EventDetail } from '@/graphql/generated/graphql';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { elementAt } from '../node_modules/rxjs/src/internal/operators/elementAt';
import Typography from './ui/typography';

export default function EventDetailElem({ index, eventData }: { index: number, eventData: EventDetail }) {
  const datePart = eventData.eventDate.split("T")[0];
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div>
            {eventData.name}
            <Link
              href={`/events/${eventData.id}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Button className="float-right mb-2">View Details</Button>
            </Link>
          </div>
          <Image
            className="m-2"
            src={eventData.imageUrl}
            width={900}
            height={100}
            alt="Event Image"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Typography element="p" as="p">
          {eventData.description}
        </Typography>
        <Typography element="p" as="p">
          {datePart}
        </Typography>
        <Typography element="p" as="p">
          {eventData.venue.name}, {eventData.venue.address}
        </Typography>
      </CardContent>
    </Card>
  );
}
