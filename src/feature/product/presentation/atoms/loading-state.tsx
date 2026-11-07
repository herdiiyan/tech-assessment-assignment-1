interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = 'Getting your next favorites ready' }: LoadingStateProps) {
    return (
        <div className="loading">
            {message}
            <span>…</span>
        </div>
    );
}