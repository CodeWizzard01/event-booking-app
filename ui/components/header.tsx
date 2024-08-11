"use client";

import { UserContext } from "@/app/signin/types/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useContext } from "react";
import Typography from "./ui/typography";
import { logout } from "@/app/signin/action";
import { AddEvent } from "@/app/events/add-event";
import { ModeToggle } from "./ui/mode-toggle";

function Header() {
  const userContext = useContext(UserContext);
  const userDetails = userContext.userDetails;
  return (
    <header className="border-b py-3 flex flex-row justify-between">
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Events
        </Link>
        {userDetails !== null && (
          <Link
            href="/bookings"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Bookings
          </Link>
        )}
        {userDetails !== null && userDetails.role === "ROLE_ADMIN" && (
          <AddEvent />
        )}
      </nav>
      {userDetails === null ? (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
          <Link
            href="/signin"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Signup
          </Link>
          <ModeToggle />
        </nav>
      ) : (
        <div className="flex items-center space-x-4">
          <Typography element="p" as="p">
            {userDetails?.name}
          </Typography>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            onClick={(e) => {
              logout("");
              userContext?.setUserDetails(null);
            }}
          >
            Logout
          </Link>
          <ModeToggle />
        </div>
      )}
    </header>
  );
}

export default Header;
