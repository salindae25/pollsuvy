import { createContext } from '@/backend/context';
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../backend/routes'

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: createContext,
});
