import { Navbar } from "@/components/navbar";
import { Sidebar } from "../../components/sidebar";

interface ChatLayoutProps {
    children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    return (
        <div>
            <Navbar />
            <main className="flex h-full">
                <Sidebar />
                <div className="h-full w-full pl-[300px]">
                    {children}
                </div>
            </main>
        </div>
    );
};