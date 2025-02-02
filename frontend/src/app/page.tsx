import { Input } from "@/components/ui/input";

export default function Home() {
    return (
        <div className="w-screen">
            <nav className="flex justify-between w-full">
                <h1>Plan My Trip</h1>
                <Input placeholder="" />
            </nav>
        </div>
    );
}
