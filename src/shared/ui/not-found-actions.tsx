"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

interface NotFoundActionsProps {
  backText: string;
  homeText: string;
  homeHref: string;
}

export function NotFoundActions({ backText, homeText, homeHref }: NotFoundActionsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-4 justify-center mt-8">
      <Button
        variant="simply-accent"
        onClick={() => router.back()}
        className="text-2xl p-5"
      >
        {backText}
      </Button>
      <Button
        variant="striking-accent"
        onClick={() => router.push(homeHref)}
        className="text-2xl p-5"
      >
        {homeText}
      </Button>
    </div>
  )
}

NotFoundActions.diesplayName = "NotFoundActions"