"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { authClient } from "@/server/better-auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Mail } from "lucide-react";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export function ForgotPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            await (authClient as any).forgetPassword({
                email: values.email,
                redirectTo: "/reset-password",
                fetchOptions: {
                    onSuccess: () => {
                        setSubmitted(true);
                        toast.success("Reset link sent");
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onError: (ctx: any) => {
                        const error = (ctx as { error?: { message: string } }).error;
                        toast.error(error?.message ?? "An unknown error occurred");
                        setLoading(false);
                    }
                }
            })
        } catch {
            toast.error("An error occurred");
            setLoading(false);
        }
    }


    if (submitted) {
        return (
            <div className="space-y-6">
                <div className="text-center">
                    <p className="text-muted-foreground">
                        If an account exists for <strong>{form.getValues("email")}</strong>, we have sent a password reset link.
                    </p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/sign-in">Back to Sign In</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="name@example.com" className="pl-10" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending link..." : "Send Reset Link"}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                <Link
                    href="/sign-in"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign In
                </Link>
            </div>
        </div>
    );
}
