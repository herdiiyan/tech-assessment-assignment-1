import { Sparkles } from 'lucide-react';
import { User } from '../../domain/user.entities';
import { Avatar } from '../../../../shared/components/atoms/avatar';

interface WelcomeBannerProps {
    user: User | null;
    loading?: boolean;
}

export function WelcomeBanner({ user, loading }: WelcomeBannerProps) {
    const firstName = user?.firstName || 'Alex';
    const emailText = loading ? 'Getting your profile ready…' : (user?.email || 'Getting your profile ready…');
    const membership = user?.membership || 'Orbit Plus';
    const balance = user ? `$${user.walletBalance.toLocaleString('en-US')}` : '$1,050';
    const initials = user?.initials || 'AM';

    return (
        <section className="welcome" aria-label="User information">
            {/* 1. Profil Pengguna */}
            <div className="welcome-user">
                <Avatar initials={initials} />
                <div>
                    <div className="welcome-label">YOUR PERSONAL SPACE</div>
                    <h2>
                        Welcome back, {firstName} <span className="wave">✳</span>
                    </h2>
                    <p>{emailText}</p>
                </div>
            </div>

            {/* 2. Status Membership */}
            <div className="member">
                <span className="plus">
                    <Sparkles size={13} /> {membership}
                </span>
                <p>A little extra, just for you.</p>
            </div>

            {/* 3. Saldo Dompet */}
            <div className="points">
                <span>YOUR WALLET BALANCE</span>
                <strong>
                    {balance} <small>USD</small>
                </strong>
                <p>Ready for your next upgrade.</p>
            </div>
        </section>
    );
}