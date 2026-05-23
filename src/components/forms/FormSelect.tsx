import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import type { SelectOption } from '@/types/common.types';

type Props<T extends FieldValues> = { name: Path<T>; control: Control<T>; label: string; options: SelectOption[]; required?: boolean; };
export const FormSelect = <T extends FieldValues>({ name, control, label, options, required }: Props<T>) => (
  <Controller name={name} control={control} render={({ field, fieldState }) => (
    <FormControl fullWidth size="small" error={!!fieldState.error} required={required}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} label={label}>
        {options.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
      </Select>
      {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
    </FormControl>
  )} />
);
