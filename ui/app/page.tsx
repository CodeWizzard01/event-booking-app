import EventDetailElem from "@/components/event";
import { getClient } from "@/graphql/apollo-client";
import { EventDetail, EventsDocument } from "@/graphql/generated/graphql";
import Image from "next/image";

export default async function Events() {
  const data = await getClient().query({ query: EventsDocument });
  const events:EventDetail[] = data.data.events;
  return (
    <div className="grid grid-cols-2 gap-3">
      {events.map((event, index) => (
        <EventDetailElem eventData={event} index={index} key={index} />
      ))}
    </div>
  );
}


