"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { z } from "zod"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
    email: z.email(),
})

export function ForgotPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const { error } = await authClient.forgetPassword({
                email: values.email,
                redirectTo: "/reset-password"
            });

            if (!error) {
                toast.success("Password reset link sent to your email");
            } else {
                toast.error(error.message);
            }


        } catch (error) {
            console.log(error);

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Forgot Password</CardTitle>
                    <CardDescription>
                        Enter your email below to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col space-y-3">
                                <Button type="submit">
                                    {isLoading ? "Resetting..." : "Reset Password"}
                                </Button>

                            </div>
                            <div className="mt-8 text-center text-sm">
                                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                            </div>

                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
