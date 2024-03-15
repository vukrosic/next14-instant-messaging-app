import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log(identity);
        if (!identity) {
            throw new ConvexError("Called storeUser without authenticated user");
        }

        // check if user is already stored
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();

        if (user !== null) {
            return user._id;
        }

        const userId = await ctx.db.insert("users", {
            tokenIdentifier: identity.tokenIdentifier,
            email: identity.email!,
            fullName: identity.name!,
            imageUrl: identity.profileUrl,
        });

        return userId;
    }
});

export const listOthers = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called listOthers without authenticated user");
        }

        return await ctx.db.query("users")
            .filter((q) => q.neq(q.field("tokenIdentifier"), identity.tokenIdentifier))
            .collect();
    }
});

export const get = query({
    args: { userId: v.id("users") },
    handler: async (ctx, { userId }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called currentUser without authenticated user");
        }

        return await ctx.db
            .get(userId)
    }
})

export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called currentUser without authenticated user");
        }

        return await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier))
            .unique();
    }
})