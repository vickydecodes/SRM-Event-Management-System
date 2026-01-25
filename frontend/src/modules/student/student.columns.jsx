// student.columns.jsx (Clean, permission-aware columns with hints, tooltips, safe text & proper actions)

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

export const useStudentColumns = (students) => [
  {
    accessorKey: 'registerNumber',
    header: () => Hint('Reg. No.', 'Unique registration number of the student'),
    cell: ({ row }) => (
      <span className="font-semibold text-foreground">
        {safetext(row.getValue('registerNumber'))}
      </span>
    ),
  },

  {
    accessorKey: 'name',
    header: () => Hint('Student Name', 'Full name of the student'),
    cell: ({ row }) => (
      <span className="font-medium">{safetext(row.getValue('name'))}</span>
    ),
  },

  {
    accessorKey: 'email',
    header: () => Hint('Email', 'Student email address'),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {safetext(row.getValue('email'), { lower: true })}
      </span>
    ),
  },

  {
    accessorKey: 'contact',
    header: () => Hint('Contact', 'Student phone number'),
    cell: ({ row }) => <span>{safetext(row.getValue('contact'))}</span>,
  },

  {
    accessorKey: 'department',
    header: () => Hint('Department', 'Academic department'),
    cell: ({ row }) => {
      const department = row.original.department;
      return <span>{safetext(department?.name || '-')}</span>;
    },
  },

  {
    accessorKey: 'course',
    header: () => Hint('Course', 'Enrolled course'),
    cell: ({ row }) => {
      const course = row.original.course;
      return <span>{safetext(course?.name || '-')}</span>;
    },
  },

  {
    accessorKey: 'year',
    header: () => Hint('Year', 'Academic year (1st, 2nd, 3rd, 4th)'),
    cell: ({ row }) => (
      <span className="font-medium">
        {safetext(row.getValue('year'))} {row.getValue('year') === 1 ? 'st' : row.getValue('year') === 2 ? 'nd' : row.getValue('year') === 3 ? 'rd' : 'th'} Year
      </span>
    ),
  },

  {
    id: 'actions',
    enableHiding: false,
    header: () => Hint('Actions', 'Actions based on permission & state'),
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open actions menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52 rounded-lg border bg-background shadow-md">
            <DropdownMenuLabel className="flex items-center gap-2">
              Actions
              {Hint(null, 'Student-level actions', true)}
            </DropdownMenuLabel>

            <Can permission={students.allow.update}>
              <DropdownMenuItem onClick={() => students.openEdit(student)}>
                Edit Student
              </DropdownMenuItem>
            </Can>

            {(students.allow.retrieve || students.allow.delete || students.allow.erase) && (
              <DropdownMenuSeparator />
            )}

            <Can permission={students.allow.retrieve} check="both" entity={student} whenDeleted>
              <DropdownMenuItem
                className="text-emerald-600 focus:bg-emerald-50"
                onClick={() => students.openRetrieve(student)}
              >
                Retrieve Record
              </DropdownMenuItem>
            </Can>

            <Can permission={students.allow.delete} check="both" entity={student} whenDeleted={false}>
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50"
                onClick={() => students.openDelete(student)}
              >
                Delete Student
              </DropdownMenuItem>
            </Can>

            <Can permission={students.allow.erase}>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-700 focus:bg-red-100 font-semibold"
                onClick={() => students.openErase(student)}
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