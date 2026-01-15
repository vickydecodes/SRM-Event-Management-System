/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState } from 'react';
import { adminRoutes } from '@/core/router/admin.routes';
// import { staffRoutes } from '@/core/router/staff.routes';
// import { studentRoutes } from '@/core/router/student.routes';
// import { teacherRoutes } from '@/core/router/teacher.routes';
import { Dialog } from '@/components/ui/dialog';
import { useAuth } from './auth.context';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
const UIContext = createContext();

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error('useUI must be used inside <UIProvider>');
  }
  return ctx;
};

export const UIProvider = ({ children }) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalProps, setModalProps] = useState({});
  const [openLogout, setOpenLogout] = useState(false);

  const { user, loading, logout } = useAuth();

  const role = user?.role;

  const SIDEBAR_KEY = `sidebar_settings_${role}`;

  const [sidebarSettings, setSidebarSettings] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(SIDEBAR_KEY)) || {
          labels: {},
          groups: {},
          routeOrder: {},
          groupOrder: [],
        }
      );
    } catch {
      return { labels: {}, groups: {}, routeOrder: {}, groupOrder: [] };
    }
  });


  const updateSidebarSettings = (updater) => {
    setSidebarSettings((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;

      localStorage.setItem(SIDEBAR_KEY, JSON.stringify(next));
      return next;
    });
  };

  const roleCommands = {
    admin: adminRoutes.routes,
  };

  const commands = adminRoutes.routes || [];

  const openModal = (type, props = {}) => {
    if (typeof type === 'function') {
      setModalType({ component: type });
    } else {
      setModalType(type);
    }
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  const ModalRenderer = () => {
    if (!modalType) return null;

    let ModalContent;

    if (typeof modalType === 'function') {
      ModalContent = modalType;
    } else if (typeof modalType === 'object' && modalType.component) {
      ModalContent = modalType.component;
    } else {
      toast.error('Invalid modal type: expected a component.');
      return null;
    }

    const safeProps = modalProps && typeof modalProps === 'object' ? modalProps : {};

    return (
      <Dialog open={!!modalType} onOpenChange={closeModal}>
        <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </Alert>
        <ModalContent {...safeProps} closeModal={closeModal} />
      </Dialog>
    );
  };

 const AlertRenderer = () => {
  return (
    <AlertDialog open={openLogout} onOpenChange={setOpenLogout}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will securely end your admin session.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={async () => {
              await logout();
              setOpenLogout(false);
            }}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};


  const value = {
    setCommandOpen,
    sidebarOpen,
    setSidebarOpen,
    commandOpen,
    commands,
    role,
    sidebarSettings,
    updateSidebarSettings,
    openModal,
    closeModal,
    setOpenLogout,
    openLogout,
  };

  return (
    <UIContext.Provider value={value}>
      {!loading && children}
      <ModalRenderer />
      <AlertRenderer/>
    </UIContext.Provider>
  );
};
