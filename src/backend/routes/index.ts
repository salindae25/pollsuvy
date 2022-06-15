
import * as trpc from '@trpc/server'
import superjson from 'superjson'
import { createRouter } from '../context';
import { pollRoute } from './polls'
import { userRoute } from './users';
export const appRouter = createRouter()
    .transformer(superjson)
    .merge('polls.', pollRoute)
    .merge('user.', userRoute)
// export type definition of API
export type AppRouter = typeof appRouter;
