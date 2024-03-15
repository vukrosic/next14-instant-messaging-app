'use client';

import clsx from "clsx";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MessageWithUserType } from "@/types";

interface MessageBoxProps {
    message: MessageWithUserType;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    message,
}) => {
    const currentUser = useQuery(api.users.currentUser);
    if (currentUser === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === null) {
        return <div>Unauthorized</div>
    }

    const isOwn = message.user._id === currentUser._id;

    const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
    const avatar = clsx(isOwn && 'order-2');
    const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
    const messageStyle = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        false ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar>
                    <AvatarImage src={message.user.imageUrl} alt={message.user.fullName} />
                    <AvatarFallback>{message.user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            <div className={body}>
                <div className={messageStyle}>
                    <div>{message.content}</div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="text-xs text-gray-400">
                        {format(new Date(message._creationTime), 'p')}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;