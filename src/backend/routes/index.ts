
import * as trpc from '@trpc/server'
import superjson from 'superjson'
import { pollRoute } from './polls'
export const appRouter = trpc
    .router()
    .transformer(superjson)
    .merge('polls.', pollRoute)
// export type definition of API
export type AppRouter = typeof appRouter;
