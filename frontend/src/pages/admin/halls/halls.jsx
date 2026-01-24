import { Separator } from "@/components/ui/separator";
import { useApi } from "@/core/contexts/api.context"
import { useLoader } from "@/core/hooks/useLoader";
import { useEffect } from "react";

export default function Halls() {
  const {halls} = useApi();

    const { load, loading } = useLoader();
  
    useEffect(() => {
      load(halls);
    }, []);

  const { HallCarousel }= halls;

  return (
    <div className="space-y-6">
    

      {/* Carousel Preview */}
      <HallCarousel
        halls={halls.state}
        onEdit={(hall) => console.log("edit", hall)}
        onDelete={(hall) => console.log("delete", hall)}
      />


      {/* Existing table stays */}
      {/* your Card + Table code exactly as is */}
    </div>
  )
}
