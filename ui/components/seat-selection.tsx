"use client";

import React, { useContext, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { createBooking } from "@/app/events/[id]/actions";
import { useToast } from "./ui/use-toast";
import { Spinner } from "./ui/spinner";
import Link from "next/link";
import Typography from "./ui/typography";
import { UserContext, UserDetails } from "@/app/signin/types/types";

function SeatSelection({
  rows,
  seatNos,
  eventId,
}: {
  rows: number[][];
  seatNos: number[];
  eventId: string;
}) {
  const { toast } = useToast();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const userContext = useContext(UserContext);
  const userDetails: UserDetails | null = userContext.userDetails;

  const toggleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const [isPending, startTransition] = useTransition();

  function bookSeats(): void {
    (async () => {
      startTransition(async () => {
        const response = await createBooking(parseInt(eventId), selectedSeats);
        console.log(response);
        if (response.bookingSuccess) {
          setSelectedSeats([]);
          toast({ description: "Booking successful" });
        } else {
          setMessage(response.message);
        }
      });
    })();
  }

  return (
    <>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex mb-1">
          {row.map((seatNumber) => {
            const isAvailable = seatNos.includes(seatNumber);
            const isSelected = selectedSeats.includes(seatNumber);
            return (
              <div
                key={seatNumber}
                style={{
                  backgroundColor: isSelected
                    ? "#3182ce"
                    : isAvailable
                    ? "green"
                    : "grey",
                }}
                className="flex rounded-md w-9 h-9 m-0.5 justify-center items-center text-white cursor-pointer"
                onClick={() => isAvailable && toggleSeatSelection(seatNumber)}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      ))}
      {userDetails !== null ? (
        <div className="flex items-center justify-between mt-5">
          <Typography element="p" as="p">
            Total Price : {selectedSeats.length * 50}
          </Typography>
          <Button
            type="submit"
            onClick={bookSeats}
            disabled={isPending}
            className="disabled:opacity-75"
          >
            Submit
          </Button>
        </div>
      ) : (
        <div className="flex float-right m-5">
          <span>Please login to book seats</span>
          <Link href="/signin">
            <Button className="float-right ml-3">Login</Button>
          </Link>
        </div>
      )}
      <div className="flex float-right m-5 text-red-500">
        <span>{message}</span>
        {isPending && (
          <div className="flex items-center gap-3">
            <Spinner size="large" />
          </div>
        )}
      </div>
    </>
  );
}

export default SeatSelection;
