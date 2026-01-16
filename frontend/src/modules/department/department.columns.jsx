// board.columns.js (with Hint on headers + tooltip inside actions + clean separators)

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { safetext } from '@/core/utils/safetext.util';
import { Hint } from '@/core/utils/tooltip.util';
import Can from '../common/can/can';

export const useDepartmentColumns = (departments) => [
  {
    accessorKey: 'name',
    accessorFn: (row) => safetext(row.name),
    header: () => Hint('Department', 'Academic department name'),
    cell: ({ row }) => <span className="font-medium">{safetext(row.getValue('name'))}</span>,
  },

  {
    accessorKey: 'description',
    header: () => Hint('Department Description', 'Detailed description of the department'),
    cell: ({ row }) => <span>{safetext(row.getValue('description'))}</span>,
  },

  {
    accessorKey: 'email',
    header: () => Hint('Department Email', 'Email address of the department'),
    cell: ({ row }) => <span>{safetext(row.getValue('email'), {lower: true})}</span>,
  },

    {
    accessorKey: 'phone',
    header: () => Hint('Department phone', 'Phone number of the department'),
    cell: ({ row }) => <span>{safetext(row.getValue('email'))}</span>,
  },

  {
    accessorKey: 'active',
    enableSorting: true,
    header: () => Hint('Status', 'Department availability status', true),
    cell: ({ row }) => (
      <span
        className={
          row.getValue('active') ? 'text-emerald-600 font-medium' : 'text-muted-foreground'
        }
      >
        {safetext(row.getValue('active'))}
      </span>
    ),
  },

  {
    id: 'actions',
    enableHiding: false,
    header: () => Hint('Actions', 'Actions based on permission & state'),
    cell: ({ row }) => {
      const department = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-52 rounded-lg border bg-background shadow-md"
          >
            <DropdownMenuLabel className="flex items-center gap-2">
              Actions
              {Hint(null, 'Board-level actions', true)}
            </DropdownMenuLabel>

            <Can permission={departments.allow.update}>
              <DropdownMenuItem onClick={() => departments.openEdit(department)}>Edit Department</DropdownMenuItem>
            </Can>

            {(departments.allow.retrieve || departments.allow.delete || departments.allow.erase) && (
              <DropdownMenuSeparator />
            )}

            <Can permission={departments.allow.retrieve} check="both" entity={department} whenDeleted>
              <DropdownMenuItem
                className="text-emerald-600 focus:bg-emerald-50"
                onClick={() => departments.openRetrieve(department)}
              >
                Retrieve Record
              </DropdownMenuItem>
            </Can>

            <Can permission={departments.allow.delete} check="both" entity={department} whenDeleted={false}>
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50"
                onClick={() => departments.openDelete(department)}
              >
                Delete Department
              </DropdownMenuItem>
            </Can>

            <Can permission={departments.allow.erase}>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-700 focus:bg-red-100 font-semibold"
                onClick={() => departments.openErase(department)}
              >
                Delete Permanently
              </DropdownMenuItem>
            </Can>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
