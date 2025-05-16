import NextAuth, { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error(
    'Missing GOOGLE_ID or GOOGLE_SECRET in environment variables'
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
