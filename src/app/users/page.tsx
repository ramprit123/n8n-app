"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserList } from "@/components/users/user-list";
import { UserFormDialog } from "@/components/users/user-form-dialog";

export default function UsersPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                    <p className="text-muted-foreground">
                        Manage your application users here.
                    </p>
                </div>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <UserList />

            <UserFormDialog open={open} onOpenChange={setOpen} />
        </div>
    );
}
