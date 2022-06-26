import { z } from 'zod';
import { prisma } from '../../db/client'
import { createRouter } from '../context';
export const userRoute = createRouter().query('auth', {
    resolve: async ({ ctx }) => {
        if (!ctx.token) throw 'access api via page'
        const user = await prisma.session.findFirst({ where: { token: ctx.token }, select: { user: true } })
        return user || null
    }
})
    .query("get-by-email", {
        input: z.object({
            email: z.string()
        }),
        resolve: async ({ input }) => {
            return await prisma?.user.findFirst({
                where: { email: input.email },
                select: {
                    name: true,
                    email: true,
                },

            })
        }
    })
    .mutation('sign-in', {
        input: z.object({
            email: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            if (!ctx.token) throw 'access api via page'
            const user = await prisma.user.findFirst({ where: { email: input.email } })
            if (!user) throw 'There is no such user';
            await prisma.session.create({ data: { token: ctx.token, userId: user.id } })
        }
    }).mutation('log-out', {
        resolve: async ({ ctx }) => {
            if (!ctx.token) throw 'access api via page'
            await prisma.session.delete({ where: { token: ctx.token } })
        }
    })
    .mutation('create', {
        input: z.object({
            email: z.string(),
            name: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            if (!ctx.token) throw 'access api via page'

            const user = await prisma.user.findFirst({ where: { email: input.email } })
            if (user) throw 'There is already user in that name';

            const newUser = await prisma?.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                }
            })
            await prisma.session.create({ data: { token: ctx.token, userId: newUser.id } })
            return 1;
        }
    });
