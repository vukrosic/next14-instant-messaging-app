import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const send = mutation({
    args: { content: v.string(), authorId: v.id("users"), chatId: v.id("chats") },
    handler: async (ctx, { chatId, content, authorId }) => {
        await ctx.db.insert("messages", {
            chatId,
            content,
            authorId
        });
    },
});