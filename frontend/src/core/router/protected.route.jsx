import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/core/contexts/auth.context";
// import NotPermitted from "@/modules/common/not-permitted/not-permitted";

export default function ProtectedRoute({ allowedRoles, module, action = "view", children }) {

  const role = 'admin';
  const hasPermission = true;
  const loading = false;

  // ===== Logs Start =====
  console.log("%c🔐 ProtectedRoute Check", "color: #4CAF50; font-weight: bold;");
  console.log("➡ allowedRoles:", allowedRoles);
  console.log("➡ currentRole:", role);
  console.log("➡ module:", module);
  console.log("➡ action:", action);
  console.log("➡ loading:", loading);
  // console.log("➡ permissionResult:", hasPermission?.(module, action));
  // ===== Logs End =====

  if (loading) {
    console.log("⏳ ProtectedRoute: Still loading auth, blocking render...");
    return null;
  }

  // Not logged in
  if (!role) {
    console.log("❌ ProtectedRoute: No role → redirect to login");
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (allowedRoles && !allowedRoles.includes(role)) {
    console.log("⛔ ProtectedRoute: Role mismatch → redirect to /" + role);
    return <Navigate to={`/${role}`} replace />;
  }

  // Permission check
  // if (module && !true) {
  //   console.log(
  //     `🚫 ProtectedRoute: Permission denied → module=${module}, action=${action}`
  //   );
  //   return <div>Not permitted</div>;
  // }

  console.log("✅ ProtectedRoute: Access granted.");
  return children ? children : <Outlet />;
}
