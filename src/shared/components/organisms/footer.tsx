import { CircleHelp, ArrowRight } from 'lucide-react';
import { Logo } from '../atoms/logo';

export function Footer() {
    return (
        <footer>
            <Logo variant="footer" />
            <span>A better everyday starts here.</span>
            <span className="footer-end">
                <CircleHelp size={14} /> A demo store, made for learning. <ArrowRight size={14} />
            </span>
        </footer>
    );
}