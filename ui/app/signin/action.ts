"use server";

import { getClient } from "@/graphql/apollo-client";
import { LoginDocument } from "@/graphql/generated/graphql";
import { ApolloError } from "@apollo/client";
import { UserDetails } from "./types/types";
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signinAction(prevState:any,formData: FormData): Promise<{ userDetails: null|UserDetails, message: string }> {
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    try {
        const response = await getClient().mutate({
          mutation: LoginDocument,
            variables: {
                loginInput: {
                    email,
                    password,
                }
            },
        });
        const userDetails:UserDetails = jwtDecode(response.data.login.accessToken);
        cookies().set("accessToken", response.data.login.accessToken, {
            httpOnly: true,
            expires: new Date(userDetails.exp * 1000),
        });
        return { userDetails, message: "" };
    }
    catch(err) {
        console.error(err);
        var errorMessage = "Login failed."; 
        if(err instanceof ApolloError) {
          err.graphQLErrors.forEach(({ message }) => {
            errorMessage += ` - ${message}`;
          });
        }
        return { userDetails: null, message: errorMessage };
    }
}

export async function logout(_: any) {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  redirect("/");
}