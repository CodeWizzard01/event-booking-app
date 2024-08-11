"use server";

import { getClient } from "@/graphql/apollo-client";
import { CreatUserDocument, User } from "@/graphql/generated/graphql";
import { redirect } from "next/navigation";


export async function signupAction(formData: FormData) {
    const user: Partial<User> = {
        name: formData.get('name')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
    }
    console.log(user);
    const response = await getClient().mutate({
        mutation: CreatUserDocument,
        variables: {
            userInput: user
        }
    });
    redirect("/signin");

}