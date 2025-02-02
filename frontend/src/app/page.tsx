import NavBar from "@/components/nav-bar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight, Globe, PlaneTakeoff, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
    return (
        <div className="w-screen pt-4 px-4 flex flex-col items-center space-y-9 [&>*]:w-full [&>*]:max-w-4xl">
            <NavBar />

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center space-y-6 py-12">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                    Plan Your Trip Together
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Simplify group travel planning with expense tracking, itinerary sharing, and collaborative decision making.
                </p>
                <div className="flex gap-4">
                    <Link href="/auth/signup" className={buttonVariants({ size: "lg" })}>
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link href="/about" className={buttonVariants({ variant: "outline", size: "lg" })}>
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-6 py-12">
                <Card>
                    <CardContent className="pt-6 text-center">
                        <div className="mb-4 flex justify-center">
                            <Users className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Group Expenses</h3>
                        <p className="text-muted-foreground">
                            Track shared expenses and split costs automatically among group members.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 text-center">
                        <div className="mb-4 flex justify-center">
                            <PlaneTakeoff className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Travel Planning</h3>
                        <p className="text-muted-foreground">
                            Create and share detailed itineraries with your travel group.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6 text-center">
                        <div className="mb-4 flex justify-center">
                            <Globe className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Multi-Currency</h3>
                        <p className="text-muted-foreground">
                            Handle expenses in different currencies with automatic conversion.
                        </p>
                    </CardContent>
                </Card>
            </section>

            {/* CTA Section */}
            <section className="bg-primary/5 rounded-2xl p-8 text-center space-y-6 my-12">
                <h2 className="text-3xl font-bold">Ready to Start Planning?</h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Join thousands of travelers who use Plan My Trip to make group travel planning easier.
                </p>
                <Link href="/auth/signup" className={buttonVariants({ size: "lg" })}>
                    Create Free Account
                </Link>
            </section>
        </div>
    );
}