import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/login/login';
import PublicNotFound from '@/modules/common/404/notfound';
import { adminRoutes } from './admin.routes';
import Layout from '@/pages/page-components/layout';
import ProtectedRoute from './protected.route';

export default function AppRoutes() {
  return (
    <Routes>
       <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route
          path="/admin/*"
          element={<Layout routes={adminRoutes.routes} logoutComponent={adminRoutes.logout} />}
        >
          {adminRoutes.routes.map((route, index) => (
            <Route
              key={index}
              index={route.index}
              path={getRelativePath(route.path, '/admin')}
              element={
                <ProtectedRoute
                  allowedRoles={['admin']}
                  module={route.module}
                  action={route.action || 'view'}
                >
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Route>
      <Route path="/" element={<Login />} />

      <Route path="*" element={<PublicNotFound />} />
    </Routes>
  );
}

function getRelativePath(fullPath, basePath) {
  if (fullPath === basePath + '/') return '';
  return fullPath.replace(basePath, '').replace(/^\//, '');
}
