'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [summaries, setSummaries] = useState<
    { _id: string; input: string; summary: string; timestamp: string }[]
  >([]);

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await fetch('/api/get-summaries');
        const data = await res.json();
        setSummaries(data);
      } catch (error) {
        console.error('Failed to fetch summaries:', error);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-2xl font-bold">Summaries List</h1>
      <div className="w-full max-w-4xl space-y-6">
        {summaries.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow-md bg-white text-left"
          >
            <p className="text-sm text-gray-500">
              {new Date(item.timestamp).toLocaleString()}
            </p>
            <p className="font-semibold mt-2">Input:</p>
            <p>{item.input}</p>
            <p className="font-semibold mt-2">Summary:</p>
            <p>{item.summary}</p>
          </div>
        ))}
      </div>
      <div>
        <Link href="/ai-workflow">
          <Button className="hover:cursor-pointer" variant="outline">
            Generate new summary
          </Button>
        </Link>
        <Button
          className="hover:cursor-pointer"
          variant="outline"
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Page;
