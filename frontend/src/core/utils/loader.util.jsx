import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const base = "bg-gray-300/80 dark:bg-gray-700/80 animate-pulse";

export const TextSkeleton = ({ width = "w-full" }) => (
  <Skeleton className={`h-4 ${width} ${base}`} />
);

export const FieldSkeleton = ({ width = "w-[180px]" }) => (
  <Skeleton className={`h-10 ${width} rounded-md ${base}`} />
);

export const CardSkeleton = () => (
  <div className="space-y-4 p-4">
    <Skeleton className={`h-6 w-1/3 ${base}`} />
    <Skeleton className={`h-4 w-full ${base}`} />
    <Skeleton className={`h-4 w-5/6 ${base}`} />
  </div>
);

export const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-5">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-24" />
          </CardContent>
        </Card>
      ))}
    </div>
    {[1, 2, 3].map((i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export const GridSkeleton = ({ rows = 6, cols = 5 }) => (
  <div className="space-y-2">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-2">
        {[...Array(cols)].map((_, j) => (
          <Skeleton
            key={j}
            className={`h-10 flex-1 rounded-md ${base}`}
          />
        ))}
      </div>
    ))}
  </div>
);


export const DatatableLoader = () => {
   return ( <div className="space-y-8">
    <div className="flex justify-between items-center">
      <TextSkeleton width="w-72 h-8" />
      <div className="flex gap-3">
        <FieldSkeleton width="w-24" />
        <FieldSkeleton width="w-24" />
        <FieldSkeleton width="w-24" />
        <FieldSkeleton width="w-32" />
      </div>
    </div>

    <div className="flex gap-4">
      <FieldSkeleton width="w-40" />
      <FieldSkeleton width="w-40" />
      <FieldSkeleton width="w-40" />
    </div>

    <div className="space-y-3">
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <TextSkeleton key={i} width="flex-1 h-6" />
        ))}
      </div>

      <GridSkeleton rows={8} cols={4} />
    </div>
  </div>)
}
