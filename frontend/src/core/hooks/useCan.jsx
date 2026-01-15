import { useAuth } from "@/core/contexts/auth.context";

export const useCan = ({
  permission,
  roles,
  bypassRole = "super_admin",
}) => {
  const { user } = useAuth();
  const role = user?.role;

  if (role === bypassRole) return true;

  if (typeof permission === "boolean") {
    return permission;
  }

  if (roles?.length) {
    return roles.includes(role);
  }

  return false;
};
