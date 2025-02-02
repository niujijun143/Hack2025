"use client";

import Avatar from "boring-avatars";
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { authClient } from '@/lib/auth-client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import img from '@/../public/plan-my-trip.png'
import Image from "next/image";

export default function NavBar({ className }: { className?: string }) {
    const { data, isPending } = authClient.useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            toast.loading("Signing out...", { id: "sign-out" });
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed out successfully", { id: "sign-out" });
                        router.push("/");
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message, { id: "sign-out" });
                    }
                }
            });
        } catch (error) {
            toast.error("Failed to sign out", { id: "sign-out" });
        }
    };

    return (
        <nav className={cn("flex justify-between items-center", className)}>
            <div className="flex items-center space-x-4">
                <Image src={img} width={32} alt="LOGO" />
                <Link href="/" className="text-2xl font-bold">Plan My Trip</Link>
            </div>
            <div className="flex items-center space-x-4">
                {(isPending || !data) ? (
                    <>
                        <Link href="/auth/signup" className={buttonVariants({ variant: "secondary" })}>Sign Up</Link>
                        <Link href="/auth/signin" className={buttonVariants()}>Sign In</Link>
                    </>
                ) : (
                    <>
                        <Link href="/dashboard" className={buttonVariants()}>Dashboard</Link>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <Avatar
                                    name={data.user.id}
                                    size={32}
                                    variant="marble"
                                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleSignOut}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )}
            </div>
        </nav>
    );
}