"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
    };
}

export function UserFormDialog({ open, onOpenChange, user }: UserFormDialogProps) {
    const router = useRouter();
    const utils = api.useUtils();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            image: user?.image ?? "",
        },
    });

    // Reset form when user changes or dialog opens
    React.useEffect(() => {
        if (open) {
            form.reset({
                name: user?.name ?? "",
                email: user?.email ?? "",
                image: user?.image ?? "",
            });
        }
    }, [user, open, form]);

    const createMutation = api.user.create.useMutation({
        onSuccess: async () => {
            toast.success("User created successfully");
            onOpenChange(false);
            await utils.user.list.invalidate();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const updateMutation = api.user.update.useMutation({
        onSuccess: async () => {
            toast.success("User updated successfully");
            onOpenChange(false);
            await utils.user.list.invalidate();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSubmit = (values: FormValues) => {
        if (user) {
            updateMutation.mutate({ id: user.id, ...values });
        } else {
            createMutation.mutate(values);
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
                    <DialogDescription>
                        {user
                            ? "Make changes to the user profile here."
                            : "Add a new user to the system."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/avatar.jpg" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
