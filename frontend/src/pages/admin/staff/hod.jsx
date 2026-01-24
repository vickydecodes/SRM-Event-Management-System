import { useApi } from '@/core/contexts/api.context';
import { useEffect } from 'react';
import DataTable from '@/components/ui/datatable';
import { createbtn } from '@/core/utils/datatable.helper.util';
import sorter from '@/core/utils/sorter.util';
import paginator from '@/core/utils/paginate.util';
import { useLoader } from '@/core/hooks/useLoader';
import ModulePage from '@/modules/common/module-loader/module-loader';

export default function HODManagement() {
  const { departments, staffs } = useApi();

  const { load, loading } = useLoader();

  useEffect(() => {
    load(departments, staffs);
  }, []);

  const openCreate = staffs.openCreate;
  const columns = staffs.useStaffColumns(staffs);

  console.log(staffs.state);
  return (
    <ModulePage module={staffs} loader={loading} bypass={true}>
      <DataTable
        columns={columns}
        create={createbtn('Add Department', openCreate)}
        data={staffs.state || []}
        // exports={batchExportConfigs}
        // filters={batchFilterConfigs}
        // customs={customConfigs}
        searchKey="name"
        reset={staffs.reset}
        manualPagination={true}
        pageCount={staffs.pagination.pages}
        totalRows={staffs.pagination.total}
        onPaginationChange={(p) => paginator(staffs, p)}
        onSortChange={(s) => sorter(staffs, s)}
      />
    </ModulePage>
  );
}
