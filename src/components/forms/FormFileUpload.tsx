import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';

type Props<T extends FieldValues> = { name: Path<T>; control: Control<T>; label?: string; accept?: Record<string,string[]>; multiple?: boolean; };
export const FormFileUpload = <T extends FieldValues>({ name, control, label = 'Drop files here or click to browse', accept, multiple = false }: Props<T>) => (
  <Controller name={name} control={control} render={({ field, fieldState }) => {
    const files: File[] = Array.isArray(field.value) ? field.value : field.value ? [field.value] : [];
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept, multiple,
      onDrop: (f) => field.onChange(multiple ? f : f[0]),
    });
    return (
      <Box>
        <Box {...getRootProps()} sx={{ border: '2px dashed', borderColor: isDragActive ? 'primary.main' : fieldState.error ? 'error.main' : 'divider',
          borderRadius: 2, p: 3, textAlign: 'center', cursor: 'pointer', bgcolor: isDragActive ? 'primary.50' : 'grey.50',
          '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' } }}>
          <input {...getInputProps()} />
          <UploadFileIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
          <Typography color="text.secondary" variant="body2">{label}</Typography>
        </Box>
        {files.length > 0 && (
          <List dense sx={{ mt: 1 }}>
            {files.map((f, i) => (
              <ListItem key={i} secondaryAction={
                <IconButton size="small" onClick={() => field.onChange(multiple ? files.filter((_, j) => j !== i) : null)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }>
                <ListItemText primary={f.name} secondary={`${(f.size / 1024).toFixed(1)} KB`} />
              </ListItem>
            ))}
          </List>
        )}
        {fieldState.error && <Typography color="error" variant="caption">{fieldState.error.message}</Typography>}
      </Box>
    );
  }} />
);
