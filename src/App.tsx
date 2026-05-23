import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { GlobalSnackbar } from '@/components/feedback/GlobalSnackbar';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalSnackbar />
    </>
  );
}
