"use client"

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function Logout() {
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    }

    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}
