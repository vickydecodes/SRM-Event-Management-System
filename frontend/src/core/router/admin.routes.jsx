import {
  IconLayoutDashboard,
  IconBuildingCommunity,
  IconUsers,
  IconUser,
  IconCalendarEvent,
  IconChecklist,
  IconSettings,
  // IconUserCircle,
  // IconLockPassword,
  IconLogout2,
} from '@tabler/icons-react';

import AdminDashboard from '@/pages/dashboards/admin-dashboard';
import Departments from '@/pages/admin/departments/departments';
import HODManagement from '@/pages/admin/hod/hod';
import Students from '@/pages/admin/students/students';
import Halls from '@/pages/admin/halls/halls';
import ApprovalRequests from '@/pages/admin/approvals/approval-requests';
import SettingsPage from '@/pages/admin/settings/settings';
// import ProfilePage from "@/modules/common/user-profile/user-profile"
// import ChangePasswordPage from "@/modules/common/change-password/changepassword"

export const adminRoutes = {
  routes: [
    {
      label: 'Dashboard',
      title: 'Admin Dashboard',
      description: 'Overview of departments, users, halls, and pending approval requests.',
      icon: <IconLayoutDashboard className="h-5 w-5 shrink-0" />,
      path: '/admin',
      index: true,
      element: <AdminDashboard />,
      module: null,
      action: null,
    },

    {
      label: 'Departments',
      title: 'Department Management',
      description: 'Create and manage academic departments.',
      icon: <IconBuildingCommunity className="h-5 w-5 shrink-0" />,
      path: '/admin/departments',
      element: <Departments />,
      module: 'department',
      action: 'view',
    },

    {
      label: 'HOD Management',
      title: 'Department Heads',
      description: 'Create and manage Heads of Departments.',
      icon: <IconUsers className="h-5 w-5 shrink-0" />,
      path: '/admin/hods',
      element: <HODManagement />,
      module: 'hod',
      action: 'view',
    },

    {
      label: 'Students',
      title: 'Student Management',
      description: 'Create and manage student records.',
      icon: <IconUser className="h-5 w-5 shrink-0" />,
      path: '/admin/students',
      element: <Students />,
      module: 'student',
      action: 'view',
    },

    {
      label: 'Halls',
      title: 'Hall & Venue Management',
      description: 'Create and manage halls and event venues.',
      icon: <IconCalendarEvent className="h-5 w-5 shrink-0" />,
      path: '/admin/halls',
      element: <Halls />,
      module: 'hall',
      action: 'view',
    },

    {
      label: 'Approval Requests',
      title: 'Event Approval Requests',
      description: 'Review and approve or reject event requests.',
      icon: <IconChecklist className="h-5 w-5 shrink-0" />,
      path: '/admin/approvals',
      element: <ApprovalRequests />,
      module: 'approval',
      action: 'update',
    },

    {
      label: 'Settings',
      title: 'System Settings',
      description: 'Configure system-level settings.',
      icon: <IconSettings className="h-5 w-5 shrink-0" />,
      path: '/admin/settings',
      element: <SettingsPage />,
      module: null,
      action: null,
    },

    // {
    //   label: "Profile",
    //   title: "Profile",
    //   description: "View and update your profile.",
    //   icon: <IconUserCircle className="h-5 w-5 shrink-0" />,
    //   path: "/admin/profile",
    //   element: <ProfilePage />,
    //   module: null,
    //   action: null,
    // },

    // {
    //   label: "Change Password",
    //   title: "Change Password",
    //   description: "Update your account password securely.",
    //   icon: <IconLockPassword className="h-5 w-5 shrink-0" />,
    //   path: "/admin/change-password",
    //   element: <ChangePasswordPage />,
    //   module: null,
    //   action: null,
    // },
  ],

  logout: {
    label: 'Logout',
    title: 'Logout',
    description: 'Sign out of your administrator account.',
    icon: <IconLogout2 className="h-5 w-5 shrink-0" />,
    path: '/',
  },
};
