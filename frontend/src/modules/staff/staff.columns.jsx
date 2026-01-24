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

export const useStaffColumns = (staffs) => [
  {
    accessorKey: 'name',
    accessorFn: (row) => safetext(row.name),
    header: () => Hint('Staff Name', 'Full name of the staff member'),
    cell: ({ row }) => (
      <span className="font-medium">
        {safetext(row.getValue('name'))}
      </span>
    ),
  },

  {
    accessorKey: 'email',
    header: () => Hint('Email', 'Official email address'),
    cell: ({ row }) => (
      <span className="lowercase">
        {safetext(row.getValue('email'), { lower: true })}
      </span>
    ),
  },

  {
    accessorKey: 'department',
    header: () => Hint('Department', 'Assigned department'),
    cell: ({ row }) => {
      return (
        <span className="text-muted-foreground">
          {safetext(row.original?.department)}
        </span>
      );
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    header: () => Hint('Actions', 'Staff-level actions'),
    cell: ({ row }) => {
      const staff = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48 rounded-lg border bg-background shadow-md"
          >
            <DropdownMenuLabel className="flex items-center gap-2">
              Actions
              {Hint(null, 'Staff account actions', true)}
            </DropdownMenuLabel>

            <Can permission={staffs.allow.update}>
              <DropdownMenuItem onClick={() => staffs.openEdit(staff)}>
                Edit Staff
              </DropdownMenuItem>
            </Can>

            {(staffs.allow.delete || staffs.allow.resetPassword) && (
              <DropdownMenuSeparator />
            )}

            <Can permission={staffs.allow.resetPassword}>
              <DropdownMenuItem
                className="text-amber-600 focus:bg-amber-50"
                onClick={() => staffs.openResetPassword(staff)}
              >
                Reset Password
              </DropdownMenuItem>
            </Can>

            <Can permission={staffs.allow.delete}>
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50"
                onClick={() => staffs.openDelete(staff)}
              >
                Remove Staff
              </DropdownMenuItem>
            </Can>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
