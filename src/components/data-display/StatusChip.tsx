import { Chip } from '@mui/material';

const STATUS_COLORS: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  DRAFT: 'default', REVIEW: 'info', APPROVED: 'primary', PUBLISHED: 'success',
  RETIRED: 'default', SUPERSEDED: 'default', ACTIVE: 'success', INACTIVE: 'default',
  PENDING: 'warning', IN_PROGRESS: 'info', COMPLETED: 'success', CANCELLED: 'default',
  AVAILABLE: 'success', RESERVED: 'warning', CALIBRATION_DUE: 'warning', OUT_OF_SERVICE: 'error',
  OPEN: 'error', CLOSED: 'default', INVESTIGATING: 'info', ASSIGNED: 'info', EXPIRED: 'error',
};

export const StatusChip = ({ status }: { status: string }) => (
  <Chip label={status.replace(/_/g, ' ')} color={STATUS_COLORS[status] ?? 'default'}
    size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
);
