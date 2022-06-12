import * as trpc from '@trpc/server'
import { z } from 'zod';
import { prisma } from '../../db/client'
export const pollRoute = trpc.
    router().query('get-all', {
        async resolve() {
            return await prisma?.poll.findMany();
        }
    }).
    query("get-by-id", {
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
    }).
    mutation('create', {
        input: z.object({
            title: z.string()
        }),
        resolve: async ({ input }) => {
            return await prisma?.poll.create({
                data: {
                    title: input.title,
                    authorId: 1,
                    expireAt: new Date('2022-07-01')
                }
            })
        }
    });
