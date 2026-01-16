// components/system/NotPermitted.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/core/contexts/auth.context";
import { useNavigate } from "react-router-dom";

export default function NotPermitted({
  title = "Access Restricted",
  description = "You don’t have permission to view this page.",
}) {
  const navigate = useNavigate();
  const {user} = useAuth();

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center gap-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground max-w-md">
        {description}
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button onClick={() => navigate(`/` + user.role)}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
