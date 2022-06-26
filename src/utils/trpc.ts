import { createReactQueryHooks } from '@trpc/react';
import { inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from '../backend/routes';

export const trpc = createReactQueryHooks<AppRouter>();
export type TQuery = keyof AppRouter['_def']['queries']
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
    AppRouter['_def']['queries'][TRouteKey]
>