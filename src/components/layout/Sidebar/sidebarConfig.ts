import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import type { SvgIconComponent } from '@mui/icons-material';

export interface NavItem { label: string; path: string; icon: SvgIconComponent; permission?: string; }
export interface NavGroup { group: string; items: NavItem[]; }

export const sidebarConfig: NavGroup[] = [
  { group: 'Overview', items: [
    { label: 'Dashboard',     path: '/app/dashboard',     icon: DashboardIcon },
  ]},
  { group: 'Laboratory', items: [
    { label: 'Samples',       path: '/app/samples',       icon: BiotechIcon,      permission: 'SAMPLE_VIEW' },
    { label: 'Worksheets',    path: '/app/worksheets',    icon: ScienceIcon,      permission: 'WORKSHEET_VIEW' },
    { label: 'ELN',           path: '/app/eln',           icon: MenuBookIcon,     permission: 'ELN_VIEW' },
    { label: 'OOS / OOT',     path: '/app/oos',           icon: VerifiedIcon,     permission: 'OOS_VIEW' },
  ]},
  { group: 'Documents', items: [
    { label: 'Documents',     path: '/app/documents',     icon: DescriptionIcon,  permission: 'DOCUMENT_VIEW' },
  ]},
  { group: 'Inventory', items: [
    { label: 'Chemicals',     path: '/app/chemicals',     icon: InventoryIcon,    permission: 'CHEMICAL_VIEW' },
    { label: 'Storage',       path: '/app/storage',       icon: StorageIcon,      permission: 'STORAGE_VIEW' },
    { label: 'Barcode Scan',  path: '/app/barcode',       icon: QrCodeScannerIcon },
  ]},
  { group: 'Equipment', items: [
    { label: 'Instruments',   path: '/app/instruments',   icon: BuildIcon,        permission: 'INSTRUMENT_VIEW' },
  ]},
  { group: 'Quality', items: [
    { label: 'QA',            path: '/app/qa',            icon: VerifiedIcon,     permission: 'QA_VIEW' },
    { label: 'Training',      path: '/app/training',      icon: SchoolIcon,       permission: 'TRAINING_VIEW' },
    { label: 'Tasks',         path: '/app/tasks',         icon: AssignmentIcon,   permission: 'TASK_VIEW' },
  ]},
  { group: 'Reports', items: [
    { label: 'Analytics',     path: '/app/analytics',     icon: BarChartIcon,     permission: 'ANALYTICS_VIEW' },
    { label: 'Audit Log',     path: '/app/audit',         icon: ManageSearchIcon, permission: 'AUDIT_VIEW' },
  ]},
  { group: 'Administration', items: [
    { label: 'Users',         path: '/app/users',         icon: PeopleIcon,       permission: 'USER_VIEW' },
    { label: 'Suppliers',     path: '/app/suppliers',     icon: LocalShippingIcon,permission: 'SUPPLIER_VIEW' },
    { label: 'Tenants',       path: '/app/tenants',       icon: BusinessIcon,     permission: 'TENANT_VIEW' },
    { label: 'Notifications', path: '/app/notifications', icon: NotificationsIcon },
  ]},
];
