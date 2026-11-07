import Link from 'next/link';
import { Logo } from '../atoms/logo';
import { Avatar } from '../atoms/avatar';

interface HeaderProps {
    userInitials?: string;
}

export function Header({ userInitials = 'AM' }: HeaderProps) {
    return (
        <header>
            <Logo variant="header" />
            <nav>
                <Link href="/" className="nav-active">Discover</Link>
            </nav>
            <div className="header-right">
                <span className="header-note">A little upgrade. A lot of possibility.</span>
                <Avatar initials={userInitials} size="small" />
            </div>
        </header>
    );
}