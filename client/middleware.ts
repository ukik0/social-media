import { NextRequest, NextResponse } from 'next/server';

import { ROUTES } from '@/utils';

export function middleware(req: NextRequest & { cookie: { userId: string } }) {
    const token = req.cookies.get('userId')?.value;

    const isAuth = !!token;

    const isAuthPage =
        req.nextUrl.pathname.startsWith(ROUTES.LOGIN) || req.nextUrl.pathname.startsWith(ROUTES.REGISTER);

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL(ROUTES.ROOT, req.url));
        }

        return null;
    }

    if (!isAuth) {
        return NextResponse.redirect(new URL(`${ROUTES.LOGIN}`, req.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/post/:path*',
        '/profile/:path*',
        '/favourites/:path*',
        '/friends/:path*',
        '/login',
        '/register'
    ]
};
