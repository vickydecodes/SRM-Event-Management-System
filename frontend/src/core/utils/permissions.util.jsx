import { toast } from 'sonner';

export const can = (permissions, entity, action, user) => {
  if (user?.role === 'super_admin') return true;
  return permissions?.[entity]?.[action] === true;
};

export const allow = (permissions, entity, action, message = null) => {
  console.log(permissions);
  const permitted = can(permissions, entity, action);
  if (!permitted) {
    toast.error(message || `You don’t have permission to ${action} ${entity.replace('-', ' ')}`);
  }
  return permitted;
};

export const guard = (permission, fn) => {
  return (...args) => {
    if (!permission) {
      toast.error(`You don't have permission  ${permission + fn.name}`);
      return;
    }
    return fn(...args);
  };
};
