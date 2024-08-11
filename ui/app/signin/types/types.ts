import { createContext } from "react";

export type UserDetails = {
    id: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}

export type UserContextType = {
    userDetails: UserDetails | null;
    setUserDetails: (userDetails: UserDetails|null) => void;
}

export const UserContext = createContext<UserContextType>({userDetails: null, setUserDetails: () => {}});