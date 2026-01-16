import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';

export default function FilterDropDown({ filters }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          Filters <ChevronDown className="ml-1 h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-40">
        {filters.map((f, idx) => (
          <DropdownMenuCheckboxItem
            key={idx}
            checked={false}
            onCheckedChange={() => {
              f.action();
            }}
          >
            {f.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
