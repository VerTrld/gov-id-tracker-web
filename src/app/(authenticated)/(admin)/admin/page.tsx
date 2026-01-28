'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const page = () => {

    const session = useSession()
    // @ts-ignore
    if (session.data?.user.roles !== 'SUPER_ADMIN') {
        redirect('/unauthorized')
    }
    return (
        <div>Admin</div>
    )
}

export default page