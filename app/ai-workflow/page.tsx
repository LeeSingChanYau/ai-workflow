'use client';
import SummaryGenerator from '@/components/SummaryGenerator';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data.length == 0 && !loading ? (
        <SummaryGenerator setData={setData} setLoading={setLoading} />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-10">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
}
