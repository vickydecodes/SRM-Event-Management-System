import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ImageOff } from 'lucide-react';

export function HallCarousel({ halls, onEdit, onDelete }) {
  if (!halls?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {halls.map((hall) => (
        <Card
          key={hall._id}
          className="rounded-2xl overflow-hidden shadow-sm pt-0"
        >
          {/* 🔹 UNIQUE carousel per card */}
          <div className="relative">
            {hall.images?.length ? (
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {hall.images.map((img, i) => (
                    <CarouselItem key={i}>
                      <div className="h-75">
                        <img
                          src={img}
                          alt={hall.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {hall.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="h-44 bg-muted flex items-center justify-center">
                <ImageOff className="text-muted-foreground h-10 w-10" />
              </div>
            )}
          </div>

          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center justify-between">
              {hall.name}
              <Badge variant={hall.active ? 'default' : 'secondary'}>
                {hall.active ? 'Active' : 'Inactive'}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {hall.description || 'No description provided'}
            </p>

            <div className="flex items-center justify-between">
              <Badge variant="outline">
                Capacity: {hall.capacity}
              </Badge>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(hall)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(hall)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
