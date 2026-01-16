import { useApi } from '@/core/contexts/api.context';
import { useEffect } from 'react';
import DataTable from '@/components/ui/datatable';
import { createbtn } from '@/core/utils/datatable.helper.util';
import sorter from '@/core/utils/sorter.util';
import paginator from '@/core/utils/paginate.util';
import { useLoader } from '@/core/hooks/useLoader';
import ModulePage from '@/modules/common/module-loader/module-loader';

export default function Departments() {
  const { departments } = useApi();

  const { load, loading } = useLoader();

  useEffect(() => {
    load(departments);
  }, []);

  const openCreate = departments.openCreate;
  const columns = departments.useDepartmentColumns(departments);

  console.log(departments.state);
  return (
    <ModulePage module={departments} loader={loading} bypass={true}>
      <DataTable
        columns={columns}
        create={createbtn('Add Department', openCreate)}
        data={departments.state || []}
        // exports={batchExportConfigs}
        // filters={batchFilterConfigs}
        // customs={customConfigs}
        searchKey="name"
        reset={departments.reset}
        manualPagination={true}
        pageCount={departments.pagination.pages}
        totalRows={departments.pagination.total}
        onPaginationChange={(p) => paginator(departments, p)}
        onSortChange={(s) => sorter(departments, s)}
      />
    </ModulePage>
  );
}
