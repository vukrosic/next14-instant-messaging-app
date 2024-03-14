import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        tokenIdentifier: v.string(),
        email: v.string(),
        fullName: v.string(),
        imageUrl: v.optional(v.string()),
    })
        .index("by_token", ["tokenIdentifier"]),
    chats: defineTable({
        participantOneId: v.id("users"),
        participantTwoId: v.id("users"),
    })
        .index('by_participantOneId', ['participantOneId', 'participantTwoId'])
        .index('by_participantTwoId', ['participantTwoId', 'participantOneId']),
    messages: defineTable({
        chatId: v.id("chats"),
        content: v.string(),
        authorId: v.id("users"),
    })
        .index("by_chatId", ["chatId"]),
    userChats: defineTable({
        chatId: v.id("chats"),
        userId: v.id("users"),
    })

});