import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
export function middleware(req: NextRequest, ev: NextFetchEvent) {

    let response = NextResponse.next()
    let userCookie = req.cookies['user-cookie']
    if (!userCookie) {
        const userToken = nanoid()
        response.cookie('user-cookie', userToken)
    }
    return response;
}