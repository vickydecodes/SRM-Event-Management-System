import { useApi } from '@/core/contexts/api.context';
import { useEffect } from 'react';
import DataTable from '@/components/ui/datatable';
import { createbtn } from '@/core/utils/datatable.helper.util';
import sorter from '@/core/utils/sorter.util';
import paginator from '@/core/utils/paginate.util';
import { useLoader } from '@/core/hooks/useLoader';
import ModulePage from '@/modules/common/module-loader/module-loader';

export default function Courses() {
  const { courses } = useApi();

  const { load, loading } = useLoader();

  useEffect(() => {
    load(courses);
  }, []);

  const openCreate = courses.openCreate;
  const columns = courses.useCourseColumns(courses);

  console.log(courses.state);
  return (
    <ModulePage module={courses} loader={loading} bypass={true}>
      <DataTable
        columns={columns}
        create={createbtn('Add Department', openCreate)}
        data={courses.state || []}
        // exports={batchExportConfigs}
        // filters={batchFilterConfigs}
        // customs={customConfigs}
        searchKey="name"
        reset={courses.reset}
        manualPagination={true}
        pageCount={courses.pagination.pages}
        totalRows={courses.pagination.total}
        onPaginationChange={(p) => paginator(courses, p)}
        onSortChange={(s) => sorter(courses, s)}
      />
    </ModulePage>
  );
}
