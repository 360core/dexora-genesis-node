'use client';
import { useEffect, useState, PropsWithChildren } from 'react';
import { Loader } from './Loader';

export function ClientOnly({ children }: PropsWithChildren) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Loader/>; // optional: render a skeleton

    return <>{children}</>;
}
