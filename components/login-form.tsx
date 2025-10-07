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
import { useRouter } from "next/navigation"
import { createAuthClient } from "better-auth/react"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await signInUser(values.email, values.password)
      if (response.success) {
        toast.success(response.message);
        router.push("/dashboard");

      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false);
    }
  }

  const authClient = createAuthClient();
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
    });

  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input placeholder="••••••••" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col space-y-3">
                <Button disabled={isLoading} type="submit">
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button onClick={signIn} variant="outline" type="button">
                  Login with Google
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
