import { Box, Card, CardContent, Typography, TextField, Button, Alert, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/api/auth/auth.queries';

const schema = z.object({ username: z.string().min(1, 'Username required'), password: z.string().min(1, 'Password required') });
type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) });
  const { mutate: login, isPending, isError } = useLogin();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1565C0 0%, #00897B 100%)' }}>
      <Card sx={{ width: '100%', maxWidth: 420, mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'primary.main', mb: 2 }}>
              <LockOutlinedIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>Welcome to LIMS</Typography>
            <Typography color="text.secondary" variant="body2">Laboratory Information Management System</Typography>
          </Box>
          {isError && <Alert severity="error" sx={{ mb: 2 }}>Invalid credentials. Please try again.</Alert>}
          <Box component="form" onSubmit={handleSubmit((d) => login(d))} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Username" {...register('username')} error={!!errors.username} helperText={errors.username?.message} autoComplete="username" autoFocus />
            <TextField label="Password" type={showPwd ? 'text' : 'password'} {...register('password')} error={!!errors.password} helperText={errors.password?.message}
              InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPwd(!showPwd)} edge="end">{showPwd ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }} />
            <Button type="submit" variant="contained" size="large" disabled={isPending} sx={{ mt: 1 }}>
              {isPending ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
