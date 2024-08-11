import { register } from "module"
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { HttpLink } from "@apollo/client";
import { setContext } from '../node_modules/@apollo/client/link/context/index';
import { cookies } from "next/headers";

export const { getClient } = registerApolloClient(() => {
    const httpLink = new HttpLink({
        uri: "http://localhost:3001/graphql",
        fetchOptions: { cache: "no-store" },
    });
    const authLink = setContext((_, { headers }) => {
        const accessToken = cookies().get("accessToken")?.value;
        return {
            headers: {
                ...headers,
                authorization: accessToken ? `${accessToken}` : "",
            },
        };
    });
    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
});
    