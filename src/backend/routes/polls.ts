import * as trpc from '@trpc/server'
import { z } from 'zod';

export const pollRoute = trpc.
    router().query('get-all', {
        async resolve() {
            return await prisma?.poll.findMany();
        }
    });
