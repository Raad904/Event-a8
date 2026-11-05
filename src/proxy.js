import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    // return NextResponse.redirect(new URL('/home', request.url))
    const session = await auth.api.getSession({
        headers: await headers()
})

const user = session?.user
if(!user){
    return NextResponse.redirect(new URL ('/Login', request.url))
}


}



export const config = {
  matcher: ['/My-events', '/Create-event', '/My-events/:path'],
}