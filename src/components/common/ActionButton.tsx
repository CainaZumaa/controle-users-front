// src/components/common/ActionButton.tsx
'use client';

import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';

interface ActionButtonProps extends ButtonProps {
  href?: string;
}

export default function ActionButton({ href, children, ...props }: ActionButtonProps) {
  const button = (
    <Button
      variant="contained"
      size="large"
      sx={{
        fontWeight: 'bold',
        textTransform: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        {button}
      </Link>
    );
  }

  return button;
}