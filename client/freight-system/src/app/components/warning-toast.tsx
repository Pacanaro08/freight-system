import { useEffect, useState } from 'react';
import { AttentionWarning, ErrorWarning, InfoWarning, SuccessWarning } from './warning';

type WarningToastProps = {
    message: string;
    duration?: number;
    type?: string;
    onClose?: () => void;
};

export default function WarningToast({ message, duration = 5000, onClose, type }: WarningToastProps) {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        setVisible(true);

        const hide = setTimeout(() => setVisible(false), duration);
        const cleanup = setTimeout(() => {
            setMounted(false);
            onClose?.();
        }, duration + 200);

        return () => {
            clearTimeout(hide);
            clearTimeout(cleanup);
        };
    }, [message, duration, onClose]);

    if (!mounted) return null;

    return (
        <div
            className={`transition-opacity duration-200 ease-in-out fixed top-5 right-5 z-50 max-w-xs ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        > 
        {
            type == 'error' && (
                <ErrorWarning warning={message} />
            )
        }
        {
            type == 'success' && (
                <SuccessWarning warning={message} />
            )
        }
        {
            type == 'attention' && (
                <AttentionWarning warning={message} />
            )
        }
        {
            type == 'info' && (
                <InfoWarning warning={message} />
            )
        }
        </div>
    );
}