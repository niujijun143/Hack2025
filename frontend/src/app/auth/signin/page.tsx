"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { useRouter } from "next/navigation";


export default function Page() {

    const { push } = useRouter();
    const { data, isPending } = authClient.useSession();
    if (!isPending && data) push("/dashboard");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const signUp = async () => {
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        }, {
            onRequest: () => {
                toast.loading("Signing in...", { id: "sign-in" })
            },
            onSuccess: () => {
                toast.success("Signed in!", { id: "sign-in" })
                push("/dashboard");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message, { id: "sign-in" })
                console.log("error", ctx)
            },
        });
    };


    return (
        <div className="w-full h-full flex justify-center items-center p-4">
            <Card className="max-w-lg w-full">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Welcome back to Plan Your Trip!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-1">
                        <Label>Email</Label>
                        <Input placeholder="johndoe@vt.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label>Password</Label>
                        <Input placeholder="••••••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <Button onClick={signUp}>Sign In</Button>
                </CardContent>
            </Card>
        </div>
    )
}