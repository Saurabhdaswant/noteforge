"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { Notebook } from "@/db/schema"
import { createNotebook, } from "@/server/notebooks"
import { authClient } from "@/lib/auth-client"

const formSchema = z.object({
    name: z.string()
})

interface NoteFormProps {
    notebook?: Notebook
}

export default function NoteForm({ notebook }: NoteFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: notebook?.name || "",
        },
    })




    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            setIsLoading(true);

            const userId = (await authClient.getSession())?.data?.user?.id;

            if (!userId) {
                toast.error("You must be logged in to create a notebook");
                return;
            }

            const response = await createNotebook({ ...values, userId });
            if (response.success) {
                form.reset();

                toast.success(notebook ? "notebook updated successfully" : "notebook created successfully");
                router.refresh();
                setIsLoading(false);
            } else {
                toast.error(response.message || "Something went wrong");
            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to create notebook");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-2 space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Submitting..." : ` ${notebook ? "Update" : "Create"} notebook`}
                </Button>
            </form>
        </Form>
    )
}
