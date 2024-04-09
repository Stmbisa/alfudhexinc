import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
// import { unstable_getServerSession } from "next-auth/next";


const login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};


// export const getServerSession = async () => {
//   return await unstable_getServerSession(authOptions);
// };


// export const getUserIdFromRequest = async (request) => {
//   const session = await getServerSession(request.req, request.res);
//   return session?.user.id;
// };
export const getUserIdFromRequest = async (request) => {
  const session = await session({ request });
  return session?.user.id;
};


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        connectToDb();
        try {
          let user = await User.findOne({ email: profile.email });

          if (!user) {
            user = new User({
              username: profile.name, // Will change this soon
              email: profile.email,
              image: profile.picture,
            });
            await user.save();
          }
          return true; // Allow sign-in
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true; // Allow sign-in for other providers
    },
    ...authConfig.callbacks,
  },
});
