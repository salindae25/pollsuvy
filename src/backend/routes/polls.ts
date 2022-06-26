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
                            _count: {
                                select: { votes: true }
                            }
                        },
                    }
                },

            })
        }
    })
    .mutation('vote', {
        input: z.object({
            optionId: z.number(),
            pollId: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            if (!ctx.token) throw { message: 'call api via page' }
            const isVoted = await prisma.vote.findFirst({
                where: {
                    pollId: input.pollId, voter: ctx.token
                },
                select: { id: true }
            })
            if (isVoted) {
                return await prisma.vote.update({
                    where: {
                        id: isVoted.id
                    },
                    data: {
                        optionId: input.optionId,
                    },
                })
            }
            return await prisma.vote.create({
                data: {
                    voter: ctx.token,
                    optionId: input.optionId,
                    pollId: input.pollId,
                }
            })
        }
    })
    .mutation('create', {
        input: z.object({
            title: z.string().min(5).max(200),
            description: z.string().max(600),
            options: z.array(z.object({ value: z.string().min(2).max(200) })).min(2).max(20)
        }),
        resolve: async ({ input, ctx }) => {

            const user = await prisma.session.findFirst({ where: { token: ctx.token }, select: { userId: true } })
            // if (!user) throw { message: 'Signup before poll create' }
            return await prisma?.poll.create({
                data: {
                    title: input.title,
                    authorId: user?.userId || 1,
                    description: input.description,
                    options: {
                        create: input.options.map((option) => ({ label: option.value }))
                    },
                    expireAt: new Date('2022-07-01')
                }
            })
        }
    });
