import React from 'react';

interface BadgeProps {
    status: 'danger' | 'warning' | 'info' | 'success';
    children: React.ReactNode;
}

export function Badge({ children, status }: BadgeProps) {
    let backgroundColor = '';
    switch (status) {
        case 'danger': {
            backgroundColor = '#f5222d';
            break;
        }
        case 'warning': {
            backgroundColor = '#faad14';
            break;
        }
        case 'info': {
            backgroundColor = '#1890ff';
            break;
        }
        default: {
            backgroundColor = '#52c41a';
            break;
        }
    }
    return (
        <span
            style={{
                padding: '0 0.5rem',
                display: 'inline-block',
                color: '#fff',
                fontWeight: 700,
                backgroundColor,
                borderRadius: '0.5rem'
            }}
        >
            {children}
        </span>
    );
}
