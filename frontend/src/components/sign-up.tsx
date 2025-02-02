"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const signUp = async () => {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name
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
        <Card className="max-w-lg">
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
    );

}