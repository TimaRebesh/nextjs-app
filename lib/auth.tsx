import NextAuth, { User as UserType, Account, Profile } from "next-auth";
import GitHub from "next-auth/providers/github";
import credentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from 'bcryptjs';

const login = async (credentials: Partial<Record<string, unknown>>) => {

  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error('User has not been found');
    }

    const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Password is not correct');
    }

    return user;

  } catch (err) {
    console.log(err);
    throw new Error('Failed to login');
  }
};


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    credentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({
      user, account, profile
    }: {
      user: UserType | undefined,
      account: Account | null,
      profile: Profile | undefined;
    }) {
      if (profile && account?.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avatar_url
            });
            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    }
  }
});