import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';

export default function ExportDropDown({ exports }) {
    return (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="lg">
        Export <ChevronDown className="ml-1 h-6 w-6" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="start" className="w-48">
      {exports.map((exp, idx) => (
        <DropdownMenuCheckboxItem
          key={idx}
          checked={false}
          onCheckedChange={() => {
            console.log('📤 Export Triggered:', exp.label);
            exp.action();
          }}
        >
          {exp.label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>)
}
