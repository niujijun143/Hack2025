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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { push } = useRouter();

    const signUp = async () => {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name
        }, {
            onRequest: (ctx) => {
                toast.loading("Signing up...", { id: "sign-up" })
            },
            onSuccess: (ctx) => {
                push("/dashboard");
            },
            onError: (ctx) => {
                toast.error(ctx.error.message, { id: "sign-up" })
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
                        <Label>Password</Label>
                        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                        <Label>Email</Label>
                        <Input placeholder="johndoe@vt.edu" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <Button onClick={signUp}>Sign Up</Button>
                </CardContent>
            </Card>
        </div>
    )
}