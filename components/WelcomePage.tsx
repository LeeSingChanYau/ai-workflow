'use client';

import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

const WelcomePage = () => {
  return (
    <div>
      <Card className="w-full h-full flex flex-col items-center justify-center p-10">
        <h1 className="text-2xl font-bold">AI workflow</h1>
        <p className="text-gray-500">Please log in or sign up</p>
        <Button
          className="hover:cursor-pointer"
          variant="outline"
          onClick={() => signIn('google', { callbackUrl: '/ai-workflow' })}
        >
          Sign In with Google
        </Button>
      </Card>
    </div>
  );
};

export default WelcomePage;
