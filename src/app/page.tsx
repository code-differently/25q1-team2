// src/app/page.tsx or wherever your home page is

"use client";

import { SignedOut, RedirectToSignIn,  } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
