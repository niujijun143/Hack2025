import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const beVietnamPro = Be_Vietnam_Pro({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <html lang="en" className="bg-blue-500">
            <body className={`${beVietnamPro.className} antialiased border-t-8 border-blue-500 w-screen min-h-screen`}>
                {/* <p className="">{JSON.stringify(session)}</p> */}
                {children}
                <Toaster />
            </body>
        </html>
    );
}
