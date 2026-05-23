import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type Props<T extends FieldValues> = { name: Path<T>; control: Control<T>; label: string; required?: boolean; };
export const FormDatePicker = <T extends FieldValues>({ name, control, label, required }: Props<T>) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Controller name={name} control={control} render={({ field, fieldState }) => (
      <DatePicker label={label} value={field.value ? dayjs(field.value as string) : null}
        onChange={(d) => field.onChange(d?.toISOString() ?? null)}
        slotProps={{ textField: { size: 'small', fullWidth: true, required, error: !!fieldState.error, helperText: fieldState.error?.message } }} />
    )} />
  </LocalizationProvider>
);
