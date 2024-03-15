'use client';

import { useCallback, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import clsx from "clsx";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatBoxProps {
    chat: Doc<"chats">;
    currentUser: Doc<"users">;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
    chat,
    currentUser,
}) => {
    const router = useRouter();
    const otherUserId = chat.participantOneId === currentUser._id ? chat.participantTwoId : chat.participantOneId;
    const otherUser = useQuery(api.users.get, { userId: otherUserId });

    const handleClick = useCallback(() => {
        router.push(`/${chat._id}`);
    }, [router, chat]);

    return (
        <div
            onClick={handleClick}
            className='
                w-full 
                relative 
                flex 
                items-center 
                space-x-6 
                p-3 
                hover:bg-neutral-100/10
                rounded-lg
                transition
                cursor-pointer'
        >
            <Avatar>
                <AvatarImage src={otherUser?.imageUrl} />
                <AvatarFallback>{otherUser?.fullName.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-md text-white font-medium">{otherUser?.fullName}</p>
        </div>
    )
}