'use client';

import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SummaryGeneratorProps {
  setData: (data: string) => void;
  setLoading: (loading: boolean) => void;
}

const SummaryGenerator: React.FC<SummaryGeneratorProps> = ({
  setData,
  setLoading,
}) => {
  const [query, setQuery] = useState<string>('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const summaryData = await res.text();
    console.log(summaryData);
    setData(summaryData);
    setLoading(false);
    router.push('/summaries-list');
  };

  const handleLogOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div>
      <Card className="w-full h-full flex flex-col items-center justify-center p-10">
        <h1 className="text-2xl font-bold">Summary Generator</h1>
        {session?.user?.name && (
          <p className="text-gray-500">Hello {session.user.name}!</p>
        )}
        <p className="text-gray-500">Summarize your input</p>
        <input
          name="query"
          value={query}
          placeholder="Enter your prompt"
          className="border border-black rounded m-5"
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <Button
          className="hover:cursor-pointer"
          variant="outline"
          onClick={handleGenerate}
        >
          Generate Summary
        </Button>

        <Button
          className="hover:cursor-pointer"
          variant="outline"
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </Card>
    </div>
  );
};

export default SummaryGenerator;
