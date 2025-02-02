"use client";
import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Page() {

    const { push } = useRouter();
    const { data, isPending } = authClient.useSession();
    // if (!isPending && data) push("/dashboard");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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
        <div className="w-full h-full flex justify-center items-center p-4">
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
                <CardFooter>
                    <Button type="submit" onClick={signUp}>Sign Up</Button>
                    <Link href="/auth/signin" className="underline text-sm text-muted-foreground">Not a user? Sign up!</Link>
                </CardFooter>
            </Card>
        </div>
    )
}