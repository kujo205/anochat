import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { user } from '@/server/db/schema'
import { pusherServerClient } from '@/server/pusher'

export const userRouter = createTRPCRouter({
    getAllUsers: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.user.findMany()
    }),
    createUser: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(user).values({
                name: input.name,
            })
        }),
    getLatestUser: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.user.findFirst({
            orderBy: (user, { desc }) => [desc(user.createdAt)],
        })
    }),
    sendTestPusherMessage: publicProcedure
        .input(z.object({ test: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await pusherServerClient.trigger('test', 'test', input)
        }),
})
