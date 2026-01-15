import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { ArrowUpDown, HelpCircle } from 'lucide-react';

export const Hint = (
  label,
  tip = '',
  sortable = false,
  icon = false,
  opts = { side: 'top', align: 'center', className: '' }
) => {
  const isString = typeof label === 'string';
  const content = tip || (isString ? label : 'Info');

  return (
    <span className="inline-flex items-center gap-1">
      {icon && label && <span>{label}</span>}

      <Tooltip>
        <TooltipTrigger asChild>
          {icon ? (
            <span className="cursor-pointer text-muted-foreground hover:text-foreground">
              <HelpCircle className="h-4 w-4" />
            </span>
          ) : (
            <span className="cursor-pointer group inline-flex items-center">
              {label} {sortable && <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />}
            </span>
          )}
        </TooltipTrigger>

        <TooltipContent side={opts.side} align={opts.align} className={opts.className}>
          <p className="text-sm text-center">{`${content}${sortable ? " (sortable)" : ""}`}</p>
        </TooltipContent>
      </Tooltip>
    </span>
  );
};
