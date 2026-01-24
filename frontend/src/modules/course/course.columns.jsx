// board.columns.js — Course Columns (clean + consistent)

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

export const useCourseColumns = (courses) => [
  {
    accessorKey: 'name',
    accessorFn: (row) => safetext(row.name),
    header: () => Hint('Course Name', 'Official course title'),
    cell: ({ row }) => (
      <span className="font-medium">{safetext(row.getValue('name'))}</span>
    ),
  },

  {
    accessorKey: 'code',
    header: () => Hint('Course Code', 'Unique academic course code'),
    cell: ({ row }) => <span>{safetext(row.getValue('code'))}</span>,
  },

  {
    accessorKey: 'description',
    header: () => Hint('Description', 'Brief course overview'),
    cell: ({ row }) => (
      <span className="text-muted-foreground line-clamp-2">
        {safetext(row.getValue('description'))}
      </span>
    ),
  },

  {
    accessorKey: 'duration',
    header: () => Hint('Duration', 'Course duration'),
    cell: ({ row }) => <span>{safetext(row.getValue('duration'))}</span>,
  },

  {
    accessorKey: 'department',
    header: () => Hint('Department', 'Offering department'),
    cell: ({ row }) => <span>{safetext(row.getValue('department'))}</span>,
  },

  {
    accessorKey: 'active',
    enableSorting: true,
    header: () => Hint('Status', 'Course availability status', true),
    cell: ({ row }) => (
      <span
        className={
          row.getValue('active')
            ? 'text-emerald-600 font-medium'
            : 'text-muted-foreground'
        }
      >
        {row.getValue('active') ? 'Active' : 'Inactive'}
      </span>
    ),
  },

  {
    id: 'actions',
    enableHiding: false,
    header: () => Hint('Actions', 'Actions based on permission & state'),
    cell: ({ row }) => {
      const course = row.original;

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
            className="w-52 rounded-lg border bg-background shadow-md"
          >
            <DropdownMenuLabel className="flex items-center gap-2">
              Actions
              {Hint(null, 'Course-level actions', true)}
            </DropdownMenuLabel>

            <Can permission={courses.allow.update}>
              <DropdownMenuItem onClick={() => courses.openEdit(course)}>
                Edit Course
              </DropdownMenuItem>
            </Can>

            {(courses.allow.retrieve ||
              courses.allow.delete ||
              courses.allow.erase) && <DropdownMenuSeparator />}

            <Can
              permission={courses.allow.retrieve}
              check="both"
              entity={course}
              whenDeleted
            >
              <DropdownMenuItem
                className="text-emerald-600 focus:bg-emerald-50"
                onClick={() => courses.openRetrieve(course)}
              >
                Retrieve Course
              </DropdownMenuItem>
            </Can>

            <Can
              permission={courses.allow.delete}
              check="both"
              entity={course}
              whenDeleted={false}
            >
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50"
                onClick={() => courses.openDelete(course)}
              >
                Delete Course
              </DropdownMenuItem>
            </Can>

            <Can permission={courses.allow.erase}>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-700 focus:bg-red-100 font-semibold"
                onClick={() => courses.openErase(course)}
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
