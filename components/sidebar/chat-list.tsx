'use client';

import { ChatBox } from "./chat-box";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SparklesIcon } from 'lucide-react';
import { useRouter } from "next/navigation";

export const ChatList = () => {
    const chats = useQuery(api.chats.listByCurrentUser);
    const currentUser = useQuery(api.users.currentUser);
    const router = useRouter();

    if (chats === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === null) {
        return <div>Error: Not Found</div>
    }

    const userchats = chats.filter((chat) => {
        return chat.participantOneId === currentUser._id || chat.participantTwoId === currentUser._id;
    });

    return (
        <>
            <button onClick={() => { router.push("/new") }} className="flex space-x-1 text-white items-center cursor-pointer px-6">
                <SparklesIcon />
                <p className="text-zinc-300 font-medium pl-4 py-4">All chats</p>
            </button>

            <div className="space-y-3">
                {userchats.map((chat) => (
                    <ChatBox
                        key={chat._id}
                        chat={chat}
                        currentUser={currentUser}
                    />
                ))}
            </div >
        </>
    );
}