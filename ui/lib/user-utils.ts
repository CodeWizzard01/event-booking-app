"use server";

import { UserDetails } from "@/app/signin/types/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function getUserDetails(): Promise<UserDetails | null> {
    const accessToken = cookies().get("accessToken")?.value;
    if (!accessToken) {
        return null;
    }
    try {
        return jwtDecode<UserDetails>(accessToken);
    }
    catch (err) { 
        console.error(err);
        return null;
    }
}