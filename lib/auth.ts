import PasswordResetEmail from "@/components/emails/reset-password";
import UserVerificationEmail from "@/components/emails/verification-email";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({

    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema
    }),

    emailVerification: {
        sendVerificationEmail: async ({ user, url, }) => {
            await resend.emails.send({
                from: 'Saurabh <onboarding@resend.dev>',
                to: user.email,
                subject: 'Verify your email for Noteforge',
                react: UserVerificationEmail({ userName: user.name || "User", verificationUrl: url, }),
            });

        },
        sendOnSignUp: true,
    },

    emailAndPassword: {
        enabled: true,

        sendResetPassword: async ({ user, url, }) => {
            await resend.emails.send({
                from: 'Saurabh <onboarding@resend.dev>',
                to: user.email,
                subject: 'Reset your password for Noteforge',
                react: PasswordResetEmail({ userEmail: user.email || "User", resetLink: url, }),
            });
        },

    },

    plugins: [nextCookies()] // make sure this is the last plugin in the array

});