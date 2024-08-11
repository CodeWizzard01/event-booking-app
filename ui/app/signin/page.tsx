"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { use, useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import { signinAction } from "./action";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { UserContext } from "./types/types";
import { Metadata } from "next";

const initialState = {
    userDetails: null,
    message: ""
}

export default function SignIn() {
    console.log("rendered signin");
    const router = useRouter();
    const [state, formAction] = useFormState(signinAction, initialState);
    const userContext = useContext(UserContext);
    useEffect(() => {
        if (state.userDetails) {
            userContext.setUserDetails(state.userDetails);
            router.push("/");
        }
    },[router, state.userDetails]);
  return (
    <div className="flex items-center justify-center">
      <Card className="w-1/3 h-1/3 m-20">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                required
              />
            </div>
            <div>
                          <Typography element="p" as="p" className="text-red-600">
                              { state?.message}
                          </Typography>         

            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" variant="outline">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
