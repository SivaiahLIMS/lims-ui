import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AuthGuard } from './guards/AuthGuard';
import { LoadingOverlay } from '@/components/feedback/LoadingOverlay';

const L = (factory: () => Promise<{ default: React.ComponentType }>) => {
  const C = lazy(factory);
  return <Suspense fallback={<LoadingOverlay open />}><C /></Suspense>;
};

// Pages
const LoginPage               = () => L(() => import('@/pages/auth/LoginPage'));
const DashboardPage           = () => L(() => import('@/pages/dashboard/DashboardPage'));
const DocumentListPage        = () => L(() => import('@/pages/documents/DocumentListPage'));
const DocumentCreatePage      = () => L(() => import('@/pages/documents/DocumentCreatePage'));
const DocumentDetailPage      = () => L(() => import('@/pages/documents/DocumentDetailPage'));
const DocumentUploadPage      = () => L(() => import('@/pages/documents/DocumentUploadPage'));
const WorksheetListPage       = () => L(() => import('@/pages/worksheets/WorksheetListPage'));
const WorksheetExecutePage    = () => L(() => import('@/pages/worksheets/WorksheetExecutePage'));
const WorksheetReviewPage     = () => L(() => import('@/pages/worksheets/WorksheetReviewPage'));
const ChemicalMasterListPage  = () => L(() => import('@/pages/chemicals/ChemicalMasterListPage'));
const ChemicalCreatePage      = () => L(() => import('@/pages/chemicals/ChemicalCreatePage'));
const ChemicalDetailPage      = () => L(() => import('@/pages/chemicals/ChemicalDetailPage'));
const ChemicalRegistrationPage= () => L(() => import('@/pages/chemicals/ChemicalRegistrationPage'));
const ChemicalStockPage       = () => L(() => import('@/pages/chemicals/ChemicalStockPage'));
const ContainersPage          = () => L(() => import('@/pages/chemicals/ContainersPage'));
const StorageTreePage         = () => L(() => import('@/pages/storage/StorageTreePage'));
const StorageViolationsPage   = () => L(() => import('@/pages/storage/StorageViolationsPage'));
const InstrumentListPage      = () => L(() => import('@/pages/instruments/InstrumentListPage'));
const InstrumentCreatePage    = () => L(() => import('@/pages/instruments/InstrumentCreatePage'));
const InstrumentDetailPage    = () => L(() => import('@/pages/instruments/InstrumentDetailPage'));
const InstrumentCalibrationPage=() => L(() => import('@/pages/instruments/InstrumentCalibrationPage'));
const OosListPage             = () => L(() => import('@/pages/oos/OosListPage'));
const OosDetailPage           = () => L(() => import('@/pages/oos/OosDetailPage'));
const BarcodeScanPage         = () => L(() => import('@/pages/barcode/BarcodeScanPage'));
const ElnListPage             = () => L(() => import('@/pages/eln/ElnListPage'));
const ElnCreatePage           = () => L(() => import('@/pages/eln/ElnCreatePage'));
const TrainingListPage        = () => L(() => import('@/pages/training/TrainingListPage'));
const TrainingAssignPage      = () => L(() => import('@/pages/training/TrainingAssignPage'));
const TaskListPage            = () => L(() => import('@/pages/tasks/TaskListPage'));
const TaskDetailPage          = () => L(() => import('@/pages/tasks/TaskDetailPage'));
const NotificationsPage       = () => L(() => import('@/pages/notifications/NotificationsPage'));
const AuditLogPage            = () => L(() => import('@/pages/audit/AuditLogPage'));
const AnalyticsDashboardPage  = () => L(() => import('@/pages/analytics/AnalyticsDashboardPage'));
const UserListPage            = () => L(() => import('@/pages/users/UserListPage'));
const UserCreatePage          = () => L(() => import('@/pages/users/UserCreatePage'));
const UserDetailPage          = () => L(() => import('@/pages/users/UserDetailPage'));
const SampleListPage          = () => L(() => import('@/pages/samples/SampleListPage'));
const SampleRegisterPage      = () => L(() => import('@/pages/samples/SampleRegisterPage'));
const SampleDetailPage        = () => L(() => import('@/pages/samples/SampleDetailPage'));
const CoaDetailPage           = () => L(() => import('@/pages/samples/CoaDetailPage'));
const QaDeviationsPage        = () => L(() => import('@/pages/qa/QaDeviationsPage'));
const CapaListPage            = () => L(() => import('@/pages/qa/CapaListPage'));
const SupplierListPage        = () => L(() => import('@/pages/suppliers/SupplierListPage'));
const TenantListPage          = () => L(() => import('@/pages/tenants/TenantListPage'));

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/app/dashboard" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/app',
    element: <AuthGuard><AppShell /></AuthGuard>,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard',              element: <DashboardPage /> },
      { path: 'documents',              element: <DocumentListPage /> },
      { path: 'documents/new',          element: <DocumentCreatePage /> },
      { path: 'documents/:id',          element: <DocumentDetailPage /> },
      { path: 'documents/:id/upload',   element: <DocumentUploadPage /> },
      { path: 'worksheets',             element: <WorksheetListPage /> },
      { path: 'worksheets/execute/:docId', element: <WorksheetExecutePage /> },
      { path: 'worksheets/:id/review',  element: <WorksheetReviewPage /> },
      { path: 'chemicals',              element: <ChemicalMasterListPage /> },
      { path: 'chemicals/new',          element: <ChemicalCreatePage /> },
      { path: 'chemicals/:id',          element: <ChemicalDetailPage /> },
      { path: 'chemicals/register',     element: <ChemicalRegistrationPage /> },
      { path: 'chemicals/stock',        element: <ChemicalStockPage /> },
      { path: 'chemicals/containers',   element: <ContainersPage /> },
      { path: 'storage',                element: <StorageTreePage /> },
      { path: 'storage/violations',     element: <StorageViolationsPage /> },
      { path: 'instruments',            element: <InstrumentListPage /> },
      { path: 'instruments/new',        element: <InstrumentCreatePage /> },
      { path: 'instruments/:id',        element: <InstrumentDetailPage /> },
      { path: 'instruments/:id/calibrate', element: <InstrumentCalibrationPage /> },
      { path: 'oos',                    element: <OosListPage /> },
      { path: 'oos/:id',                element: <OosDetailPage /> },
      { path: 'barcode',                element: <BarcodeScanPage /> },
      { path: 'eln',                    element: <ElnListPage /> },
      { path: 'eln/new',                element: <ElnCreatePage /> },
      { path: 'training',               element: <TrainingListPage /> },
      { path: 'training/assign',        element: <TrainingAssignPage /> },
      { path: 'tasks',                  element: <TaskListPage /> },
      { path: 'tasks/:id',              element: <TaskDetailPage /> },
      { path: 'notifications',          element: <NotificationsPage /> },
      { path: 'audit',                  element: <AuditLogPage /> },
      { path: 'analytics',              element: <AnalyticsDashboardPage /> },
      { path: 'users',                  element: <UserListPage /> },
      { path: 'users/new',              element: <UserCreatePage /> },
      { path: 'users/:id',              element: <UserDetailPage /> },
      { path: 'samples',                element: <SampleListPage /> },
      { path: 'samples/register',       element: <SampleRegisterPage /> },
      { path: 'samples/:id',            element: <SampleDetailPage /> },
      { path: 'samples/:id/coa',        element: <CoaDetailPage /> },
      { path: 'qa',                     element: <QaDeviationsPage /> },
      { path: 'qa/capas',               element: <CapaListPage /> },
      { path: 'suppliers',              element: <SupplierListPage /> },
      { path: 'tenants',                element: <TenantListPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/app/dashboard" replace /> },
]);
