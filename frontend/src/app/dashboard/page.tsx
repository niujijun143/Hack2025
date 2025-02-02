import NavBar from '@/components/nav-bar'
import { buttonVariants } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import React, { Suspense } from 'react'
import Dash from "@/components/dash"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Avatar from 'boring-avatars'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) {
        return (
            <div className="w-screen pt-4 px-4 flex flex-col items-center [&>*]:w-full [&>*]:max-w-4xl h-full">
                <NavBar />
                <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
                    <p>Not signed in</p>
                    <div className='space-x-4'>
                        <Link href="/auth/signup" className={buttonVariants({ variant: "secondary" })}>Sign Up</Link>
                        <Link href="/auth/signin" className={buttonVariants()}>Sign In</Link>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <div className="w-screen">
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center px-4 max-w-7xl mx-auto w-full justify-between">
                    <div className="flex justify-between items-center space-x-6 w-full">
                        <Link href="/dashboard" className="text-2xl font-bold">
                            Dashboard
                        </Link>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none">
                                <Avatar
                                    name={session.user.id}
                                    size={32}
                                    variant="marble"
                                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </nav>

            <div className="bg-muted w-full min-h-[calc(100vh-4rem)]">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center h-64">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        }
                    >
                        <Data />
                    </Suspense>
                </div>
            </div>
        </div>
    );

}

async function Data() {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return <Dash />
}