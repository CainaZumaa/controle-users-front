// src/components/common/PageHeader.tsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <Box component="header" mb={4}>
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" component="p" color="text.secondary" sx={{ maxWidth: '600px' }}>
        {subtitle}
      </Typography>
      <Divider sx={{ mt: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
    </Box>
  );
}