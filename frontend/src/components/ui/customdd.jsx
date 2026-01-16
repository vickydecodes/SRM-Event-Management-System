import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';

export default function CustomDropDown({ title, filters }) {
    return (
  <DropdownMenu className=''>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="lg">
        {title} <ChevronDown className="ml-1 h-6 w-6" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="start" className="w-48">
      {filters.map((f, idx) => (
        <DropdownMenuCheckboxItem
          key={idx}
          checked={false}
          onCheckedChange={() => {
            console.log('📤 Export Triggered:', f.label);
            f.action();
          }}
        >
          {f.label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>)
}
