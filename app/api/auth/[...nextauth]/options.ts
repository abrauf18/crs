import type { NextAuthOptions } from 'next-auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email:',
                    type: 'text',
                    placeholder: 'Email',
                },
                password: {
                    label: 'Password:',
                    type: 'password',
                    placeholder: 'Password',
                },
            },
            async authorize(credentials) {
                const { email, password } = credentials || {};
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    }
                );
                const data = await response.json();
                console.log("data inside authorize: ", data);
                if (data.status === 'success') {
                    return data.data; // return data.data;
                }
                return data; // return null;
            },
        }),
    ],
    callbacks: {
        // async jwt({ token, user }: any) {
        //     if (user) {
        //         token.user = { ...user };
        //     }
        //     return token;
        // },
        // async session({ session, token }: any) {
        //     session.user = token;
        //     return { ...session, ...token };
        // },
        async jwt({ token, user }: any) {
            // console.log('jwt -> token, user: ', token, user);
            if (user) {
                token.user = { ...user };
            }
            return token;
        },
        async session({ session, token }: any) {
            // console.log('session -> session, token: ', session, token)
            session.user = token;
            return { ...session, ...token };
        },
    },
    secret: process.env.NEXTAUTH_SECRET as string,
};
