"use client";

import { useEffect } from 'react';
import DataTable from '@/components/ui/datatable';
import { createbtn } from '@/core/utils/datatable.helper.util';
import sorter from '@/core/utils/sorter.util';
import paginator from '@/core/utils/paginate.util';
import { useLoader } from '@/core/hooks/useLoader';
import ModulePage from '@/modules/common/module-loader/module-loader';
import { useStudentModule } from '@/modules/student/student.module'; // ← direct import

export default function Students() {
  // Create the module instance directly here (no context needed)
  const students = useStudentModule({}); // empty object since exported is optional

  const { load, loading } = useLoader();

  useEffect(() => {
    if (students) {
      load(students);
    }
  }, [students]);

  if (!students) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p>Initializing student module...</p>
        </div>
      </div>
    );
  }

  const openCreate = students.openCreate;
  const columns = students.useStudentColumns(students);

  return (
    <ModulePage module={students} loader={loading} bypass={true}>
      <DataTable
        columns={columns}
        create={createbtn('Add Student', openCreate)}
        data={students.state || []}
        searchKey="name" // or change to "registerNumber"
        reset={students.reset}
        manualPagination={true}
        pageCount={students.pagination?.pages ?? -1}
        totalRows={students.pagination?.total ?? 0}
        onPaginationChange={(p) => paginator(students, p)}
        onSortChange={(s) => sorter(students, s)}
      />
    </ModulePage>
  );
}