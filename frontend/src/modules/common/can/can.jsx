import { useCan } from "@/core/hooks/useCan";

export default function Can({
  check = "permission",
  permission,
  roles,
  bypassRole,
  entity,
  whenDeleted,
  children,
}) {
  // ✅ Hook is ALWAYS called
  const canByPermission = useCan({ permission, roles, bypassRole });

  let allowed = true;

  if (check === "permission") {
    allowed = canByPermission;
  }

  if (check === "entity" && entity) {
    if (typeof whenDeleted === "boolean") {
      allowed = entity.deleted === whenDeleted;
    }
  }

  if (check === "both" && entity) {
    if (typeof whenDeleted === "boolean") {
      allowed = canByPermission && entity.deleted === whenDeleted;
    } else {
      allowed = canByPermission;
    }
  }

  if (!allowed) return null;

  return children;
}
