import { Box, Button, Card, CardContent } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { FormTextField } from '@/components/forms/FormTextField';
import { FormSelect } from '@/components/forms/FormSelect';
import { useUiStore } from '@/store/uiStore';

const schema = z.object({
  fullName: z.string().min(1, 'Required'), username: z.string().min(3, 'Min 3 chars'),
  email: z.string().email('Invalid email'), password: z.string().min(6, 'Min 6 chars'),
  department: z.string().optional(), phone: z.string().optional(),
  role: z.string().min(1, 'Required'), status: z.string().optional(),
});
type Form = z.infer<typeof schema>;
const ROLES = [{ value:'ANALYST', label:'Analyst' },{ value:'QA_MANAGER', label:'QA Manager' },{ value:'LAB_MANAGER', label:'Lab Manager' },{ value:'STOREKEEPER', label:'Storekeeper' },{ value:'ADMIN', label:'Admin' }];
const DEPTS = [{ value:'QC', label:'Quality Control' },{ value:'QA', label:'Quality Assurance' },{ value:'RD', label:'R&D' },{ value:'Store', label:'Stores' },{ value:'Admin', label:'Administration' }];

export default function UserCreatePage() {
  const nav = useNavigate();
  const { showSnackbar } = useUiStore();
  const { control, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) });
  const onSubmit = (data: Form) => { console.log(data); showSnackbar('User created', 'success'); nav('/app/users'); };

  return (
    <PageWrapper title="Create User" breadcrumbs={[{ label:'Users', to:'/app/users' },{ label:'Create' }]}>
      <Card sx={{ maxWidth: 720 }}>
        <CardContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2.5 }}>
            <FormTextField name="fullName"   control={control} label="Full Name"  required />
            <FormTextField name="username"   control={control} label="Username"   required />
            <FormTextField name="email"      control={control} label="Email"      required />
            <FormTextField name="password"   control={control} label="Password"   type="password" required />
            <FormTextField name="phone"      control={control} label="Phone Number" />
            <FormSelect    name="department" control={control} label="Department" options={DEPTS} />
            <FormSelect    name="role"       control={control} label="Role"       options={ROLES} required />
            <FormSelect    name="status"     control={control} label="Status"     options={[{ value:'ACTIVE', label:'Active' },{ value:'INACTIVE', label:'Inactive' }]} />
            <Box sx={{ gridColumn:'1 / -1', display:'flex', gap:2, justifyContent:'flex-end' }}>
              <Button variant="outlined" onClick={() => nav('/app/users')}>Cancel</Button>
              <Button type="submit" variant="contained">Create User</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
