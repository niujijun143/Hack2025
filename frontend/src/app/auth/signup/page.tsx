"use client";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/nav-bar";


export default function Page() {
    const { push } = useRouter();
    const { data, isPending } = authClient.useSession();
    // if (!isPending && data) push("/dashboard");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    if (!isPending && data) return (
        <div className="w-screen pt-4 px-4 flex flex-col items-center [&>*]:w-full [&>*]:max-w-4xl h-full">
            <NavBar />
            <div className='w-full h-full flex flex-col justify-center items-center gap-4'>
                <p>Already signed in!</p>
                <div className='space-x-4'>
                    <Link href="/" className={buttonVariants({ variant: "secondary" })}>Landing Page</Link>
                    <Link href="/dashboard" className={buttonVariants()}>Dashboard</Link>
                </div>
            </div>
        </div>
    )

    const signUp = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name
        }, {
            onRequest: () => {
                toast.loading("Signing up...", { id: "sign-up" })
            },
            onSuccess: () => {
                toast.success("Signed up!", { id: "sign-up" })
                push("/dashboard");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message, { id: "sign-up" })
                console.log("error", ctx)
            },
        });
    };

    return (
        <div className="w-screen pt-4 px-4 flex flex-col items-center space-y-9 [&>*]:w-full [&>*]:max-w-4xl h-full">
            <NavBar />
            <div className="w-full flex h-full justify-center items-center p-4">
                <Card className="max-w-lg w-full">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Welcome to Plan Your Trip!</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input placeholder="John Doe" type="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input placeholder="johndoe@vt.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <Input placeholder="••••••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2">
                        <Button type="submit" onClick={signUp}>Sign Up</Button>
                        <Link href="/auth/signin" className="underline text-sm text-muted-foreground">{"\n"}Already a user? Sign in!</Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}