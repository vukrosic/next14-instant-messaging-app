"use client";

import { ChatList } from "./chat-list";

export const Sidebar = () => {
    return (
        <div className="fixed top-0 left-0 flex flex-col w-[300px] h-full bg-gray-800">
            <ChatList />
        </div>
    );
};