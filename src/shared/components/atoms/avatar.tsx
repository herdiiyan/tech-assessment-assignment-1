interface AvatarProps {
    initials?: string;
    size?: 'normal' | 'small';
}

export function Avatar({ initials = 'AM', size = 'normal' }: AvatarProps) {
    const isSmall = size === 'small';

    return (
        <div className={`avatar ${isSmall ? 'small' : ''}`}>
            {initials}
        </div>
    );
}