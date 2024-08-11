import { getClient } from "@/graphql/apollo-client";
import { Booking, BookingsDocument } from "@/graphql/generated/graphql";
import React from "react";

async function Page() {
  const data = await getClient().query({ query: BookingsDocument });
  const bookings: Booking[] = data.data.allBookings;
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Booking Date
            </th>
            <th scope="col" className="px-6 py-3">
              Event Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Seats
            </th>
            <th scope="col" className="px-6 py-3">
              Seat Numbers
            </th>{" "}
            {/* Added column for Seat Numbers */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {booking.id}
              </th>
              <td className="px-6 py-4">{booking.bookingDate}</td>
              <td className="px-6 py-4">{booking.event.name}</td>
              <td className="px-6 py-4">{booking.price}</td>
              <td className="px-6 py-4">{booking.tickets.length}</td>
              <td className="px-6 py-4">
                {booking.tickets.map((ticket) => ticket.seatNo).join(", ")}{" "}
                {/* Displaying seat numbers */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
