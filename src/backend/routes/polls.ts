import { z } from 'zod';
import { prisma } from '../../db/client'
import { createRouter } from '../context';
export const pollRoute = createRouter()
    .query('get-all', {
        async resolve({ ctx }) {
            if (!ctx.token) throw { message: 'call api via page' }
            const user = await prisma.session.findFirst({ where: { token: ctx.token }, select: { userId: true } })
            if (!user) return []
            return await prisma?.poll.findMany({ where: { authorId: user.userId } });
        }
    })
    .query("get-by-id", {
        input: z.object({
            id: z.string()
        }),
        resolve: async ({ input }) => {
            return await prisma?.poll.findFirst({
                where: { id: input.id },
                select: {
                    id: true,
                    title: true,
                    createdAt: true,
                    expireAt: true,
                    options: {
                        select: {
                            label: true,
                            id: true,
                        }
                    }
                },

            })
        }
    })
    .mutation('create', {
        input: z.object({
            title: z.string().min(5).max(200),
            description: z.string().max(600)
        }),
        resolve: async ({ input, ctx }) => {

            const user = await prisma.session.findFirst({ where: { token: ctx.token }, select: { userId: true } })
            if (!user) throw { message: 'Signup before poll create' }
            return await prisma?.poll.create({
                data: {
                    title: input.title,
                    authorId: user.userId,
                    description: input.description,
                    expireAt: new Date('2022-07-01')
                }
            })
        }
    });
