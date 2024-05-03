import { Session, User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & {
      access_token: string;
    };
  }

  interface User {
    access_token: string;
  }
}