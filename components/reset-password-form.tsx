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
import { signInUser } from "@/server/users"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

export function ResetPasswordForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {

            if (values.password !== values.confirmPassword) {
                toast.error("Passwords do not match");
                setIsLoading(false);
                return;
            }

            const { error } = await authClient.resetPassword({
                token: token ?? "", newPassword: values.password
            })
            if (!error) {
                toast.success("Password reset successfully");
                router.push("/login");

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
                    <CardTitle>Reset your password</CardTitle>
                    <CardDescription>
                        Enter your new password below to reset it
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col space-y-3">
                                <Button disabled={isLoading} type="submit">
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
