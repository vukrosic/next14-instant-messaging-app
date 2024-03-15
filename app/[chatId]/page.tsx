"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Body } from "./_components/body";
import { Form } from "./_components/form";

interface ChatProps {
    params: {
        chatId: Id<"chats">;
    }
};

const ChatPage = ({ params }: ChatProps) => {
    const chatWithMessages = useQuery(api.chats.getChat, { chatId: params.chatId });
    const currentUser = useQuery(api.users.currentUser, {});

    if (chatWithMessages === undefined || currentUser === undefined) return <div>Loading...</div>;

    if (currentUser === null) return <div>Unauthorized</div>

    return (
        <div className="h-full">
            <div className="h-full flex flex-col">
                <Body messages={chatWithMessages.messagesWithUsers} />
                <Form
                    authorId={currentUser._id}
                    chatId={chatWithMessages.chat._id}
                />
            </div>
        </div>
    );
};

export default ChatPage;