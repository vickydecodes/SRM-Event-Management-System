import * as React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { capitalize } from '@/core/utils/helper.utils';

export function CommandMenu({ open, setOpen, role = 'admin', commands }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const navigateTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  if (!commands || commands.length === 0) return null;
  const roleLabel = role.replace(/_/g, ' ').split(' ').map(capitalize).join(' ');

  const ROLE_BADGE_MAP = {
    super_admin: {
      variant: '',
      className: 'bg-blue-600 text-white',
    },
    junior_admin: {
      variant: 'secondary',
      className: 'bg-blue-600 text-white',
    },
    teacher: {
      variant: 'outline',
      className: 'bg-green-600 text-white',
    },
    student: {
      variant: 'outline',
      className: 'bg-green-600 text-white',
    },
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup
          heading={
            <Badge className={ROLE_BADGE_MAP[role]?.className}>{roleLabel} Navigation</Badge>
          }
        >
          {commands.map((cmd) => (
            <CommandItem key={cmd.path} onSelect={() => navigateTo(cmd.path)}>
              {cmd.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
