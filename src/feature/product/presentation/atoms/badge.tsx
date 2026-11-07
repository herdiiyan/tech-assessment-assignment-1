interface BadgeProps {
    text: string;
}

export function Badge({ text }: BadgeProps) {
    const isGreen = text === 'NEW ARRIVAL';

    return (
        <span className={`badge ${isGreen ? 'green' : ''}`}>
            {text}
        </span>
    );
}