'use client';
import React from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Outlet, useLocation } from 'react-router-dom';
import { CommandMenu } from './command';
import { Search } from 'lucide-react';
import { useUI } from '@/core/contexts/ui.context';

export default function Layout({ routes, logoutComponent }) {
  const { setCommandOpen, sidebarOpen, setSidebarOpen, commandOpen, commands, setOpenLogout } =
    useUI();

  const location = useLocation();
  const currentRoute = routes.find((r) => location.pathname === r.path) || null;

  return (
    <div
      className={cn(
        'mx-auto flex h-screen w-screen flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800'
      )}
    >
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-10" setCommandOpen={setCommandOpen}>
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto scrollbar-none">
            {sidebarOpen ? <Logo /> : <Logo />}

            <div className="mt-8 flex flex-col gap-2">
              {routes.map((route) => (
                <SidebarLink key={route.path} link={route} />
              ))}

              <SidebarLink
                className="hover:text-destructive"
                onClick={(e) => {
                  e.preventDefault();
                  setSidebarOpen(false);
                  setOpenLogout(true);
                }}
                link={logoutComponent}
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {commands && commands.length > 0 && (
        <CommandMenu open={commandOpen} setOpen={setCommandOpen} commands={commands} />
      )}

      {/* Main Content */}
      <div
        className={
          currentRoute?.title
            ? 'relative w-full min-h-screen overflow-auto bg-gray-50 p-4 md:p-6 dark:bg-gray-900 scrollbar-none'
            : 'relative w-full overflow-auto bg-gray-50 dark:bg-gray-900 scrollbar-none'
        }
      >
        {/* Top bar */}
        {currentRoute?.title && currentRoute?.description && (
          <div className="mb-10 flex items-center justify-between md:m-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {currentRoute.title}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{currentRoute.description}</p>
            </div>

            <button
              onClick={() => setCommandOpen((prev) => !prev)}
              className="rounded-md p-2 transition hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Open command menu"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        )}
    <div className="m-1 md:m-10 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <SidebarLink
      link={{
        label: 'Admin Panel',
        path: '#',
        icon: (
          <img
            src="/imgs/logo.png"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
            alt="Logo"
          />
        ),
      }}
    />
  );
};

export const LogoIcon = () => (
  <div className="relative z-20 flex items-center space-x-2 py-1">
    <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
  </div>
);
