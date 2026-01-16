import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Database } from 'lucide-react';

export function EmptyDemo({
  title = 'No Projects Yet',
  icon = <Database/>,
  description = 'You haven&apos;t created any projects yet. Get started by creating your first project.',
  buttons = [],
}) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {icon}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          {buttons.map((b) => (
            <Button onClick={b.action}>{b.label}</Button>
          ))}
        </div>
      </EmptyContent>
    </Empty>
  );
}
