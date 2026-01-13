"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { UserFormDialog } from "./user-form-dialog";

interface UserActionsProps {
    user: {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
    };
}

export function UserActions({ user }: UserActionsProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const utils = api.useUtils();

    const deleteMutation = api.user.delete.useMutation({
        onSuccess: async () => {
            toast.success("User deleted successfully");
            await utils.user.list.invalidate();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this user?")) {
                                deleteMutation.mutate({ id: user.id });
                            }
                        }}
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <UserFormDialog
                open={open}
                onOpenChange={setOpen}
                user={user}
            />
        </>
    );
}
