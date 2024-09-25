import { Alert } from '@/components/ui/alert';

const ErrorAlert = ({ errors }: { errors: Record<string, string> }) => {
    const errorMessages = Object.values(errors).filter(Boolean);

    if (errorMessages.length === 0) return null;

    return (
        <Alert variant="destructive" className="mb-4">
            <ul>
                {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </Alert>
    );
};


export default ErrorAlert;
