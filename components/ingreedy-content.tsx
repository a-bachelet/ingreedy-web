'use client';

import { Card } from "@material-tailwind/react";

export default function IngreedyContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-full flex justify-center h-[calc(100%-64px)]">
      <div className="max-w-[1024px] w-full flex items-center justify-between h-full p-4">
        <Card variant="filled" className="h-full w-full p-4 flex items-stretch justify-between overflow-hidden">
          {children}
        </Card>
      </div>
    </div>
  )
}