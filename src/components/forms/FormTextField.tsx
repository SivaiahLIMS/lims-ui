import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';

type Props<T extends FieldValues> = Omit<TextFieldProps, 'name'> & { name: Path<T>; control: Control<T>; };
export const FormTextField = <T extends FieldValues>({ name, control, ...rest }: Props<T>) => (
  <Controller name={name} control={control} render={({ field, fieldState }) => (
    <TextField {...field} {...rest} error={!!fieldState.error} helperText={fieldState.error?.message} fullWidth />
  )} />
);
