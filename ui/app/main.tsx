"use client";

import Footer from '@/components/footer';
import Header from '@/components/header';
import React, { use, useEffect, useState } from 'react'
import { UserContext, UserDetails } from './signin/types/types';
import { get } from 'http';
import { getUserDetails } from '@/lib/user-utils';

export default function AppMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    useEffect(() => {
        (async () => {
            const userDetails = await getUserDetails();
            setUserDetails(userDetails);
        })();
    },[]);
  return (
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
      <Header />
      <main className="grow py-3">{children}</main>
      <Footer />
    </UserContext.Provider>
  );
}
