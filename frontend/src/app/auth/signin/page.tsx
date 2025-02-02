"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Page() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        }, {
            onRequest: (ctx) => {
                //show loading
                console.log("req", ctx)
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard
                console.log("succ", ctx)
            },
            onError: (ctx) => {
                alert(ctx.error.message);
                console.log("error", ctx)
            },
        });
    };

    return (
        <div>
            <Card className="max-w-lg">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Welcome to Plan Your Trip!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
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