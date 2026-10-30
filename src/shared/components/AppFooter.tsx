import Link from 'next/link';
import { CircleHelp, ArrowRight } from 'lucide-react';

export function AppFooter() {
    return (
        <footer>
            <Link href="/" className="logo">
                ◉ orbit.
            </Link>
            <span>A better everyday starts here.</span>
            <span className="footer-end">
                <CircleHelp size={14} /> A demo store, made for learning. <ArrowRight size={14} />
            </span>
        </footer>
    );
}
