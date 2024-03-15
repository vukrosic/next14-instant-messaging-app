import { Doc, Id } from "@/convex/_generated/dataModel";

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";


interface UserCardProps {
    otherUser: Doc<"users">;
}

export const UserCard = ({ otherUser }: UserCardProps) => {
    const {
        mutate: chat,
        pending
    } = useApiMutation(api.chats.getOrCreate);
    const router = useRouter();

    const handleClick = async () => {
        const chatId = await chat({ otherUserId: otherUser._id })
        router.push(`/${chatId}`);
    }

    return (
        <Card className="flex items-center justify-center bg-gray-100">

            <CardContent className="flex flex-col items-center justify-center p-4 gap-y-4 bg-gray-100">
                <div className="flex gap-5">
                    <Avatar>
                        <AvatarImage src={otherUser.imageUrl} />
                        <AvatarFallback>{otherUser.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="items-center text-center flex font-semibold">{otherUser.fullName}</p>
                </div>
                <Button disabled={pending} onClick={handleClick} className="cursor-pointer">Send Message</Button>
            </CardContent>
        </Card>
    );
};