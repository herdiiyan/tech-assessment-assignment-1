import Link from 'next/link';

interface LogoProps {
    variant?: 'header' | 'footer';
}

export function Logo({ variant = 'header' }: LogoProps) {
    if (variant === 'footer') {
        return (
            <Link href="/" className="logo">
                ◉ orbit.
            </Link>
        );
    }

    return (
        <Link href="/" className="logo">
            <span className="orbit-mark">◉</span> orbit
            <span className="logo-dot">.</span>
        </Link>
    );
}