"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function InternalServerError() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg">
        <Image
          src="/images/all/error/404-error.png"
          width={600}
          height={600}
          alt="Internal Server Error"
          className="w-full h-auto object-contain"
        />
        <h1 className="mt-6 text-3xl md:text-4xl font-bold text-default-100">
          Ops! Page Not Found
        </h1>
        <p className="mt-4 text-default-200">
          It might have been moved, renamed, or temporarily offline.
        </p>
        <Button
          asChild
          className="mt-6 px-3 py-6"
        >
          <Link href="/">Go To Home Page</Link>
        </Button>
      </div>
    </div>
  );
}

export default InternalServerError;
