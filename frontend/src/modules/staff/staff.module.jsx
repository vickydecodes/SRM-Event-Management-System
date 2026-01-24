import { useStaffStore } from './staff.store';
import { apiurls } from '@/core/api/api.urls';
import { createCrud as crudFactory } from '../../core/factory/entity.crud';
import { useStaffColumns } from './staff.columns';
import { useUI } from '@/core/contexts/ui.context';
// import { modals } from './staff.modals';
// import { usestaffColumns } from './staff.columns';
// import { useAuth } from '@/core/contexts/auth.context';
import { guard } from '@/core/utils/permissions.util';
import { createEntityQueryActions } from '@/core/utils/entity.util';
import { modals } from './staff.modals';

export const useStaffModule = (exported) => {
  const store = useStaffStore();
  //   const { user, permissions } = useAuth();
  const { set, add, update, remove, setQuery } = store;
  const { openModal } = useUI();

  const urls = apiurls.staffs;

  const crud = crudFactory({
    entity: 'Staff ',
    urls,
    store,
    // getRole: () => user.role,
  });

//   const allow = {
//     getAll: can(permissions, 'board', 'getAll', user),
//     view: can(permissions, 'board', 'view', user),
//     create: can(permissions, 'board', 'create', user),
//     update: can(permissions, 'board', 'update', user),
//     delete: can(permissions, 'board', 'delete', user),
//     erase: can(permissions, 'board', 'erase', user),
//     retrieve: can(permissions, 'board', 'retrieve', user),
//   };

  const allow = {
    view: true,
    create: true,
    update: true,
    delete: true,
    erase: true,
    retrieve: true,
  };

  const openCreate = guard(allow.create, () =>
    openModal(modals.create, {
      submitFn: (data) => crud.create(data, { __options: { error: false } }),
      exported,
    })
  );

  const openEdit = guard(allow.update, (staff) =>
    openModal(modals.edit, {
      staff,
      exported,
      submitFn: (data) => crud.edit(staff._id, data, { __options: { error: false } }),
    })
  );

  const openDelete = guard(allow.delete, (staff) =>
    openModal(modals.delete, {
      id: staff._id,
      submitFn: () => crud.delete(staff._id, { __options: { error: false } }),
    })
  );

  const openErase = guard(allow.erase, (staff) =>
    openModal(modals.erase, {
      id: staff._id,
      submitFn: () => crud.erase(staff._id, { __options: { error: false } }),
    })
  );

  const openRetrieve = guard(allow.retrieve, (staff) =>
    openModal(modals.retrieve, {
      id: staff._id,
      submitFn: () => crud.retrieve(staff._id, { __options: { error: false } }),
    })
  );

  const openToggleActive = guard(allow.update, (staff) =>
    openModal(modals.toggleActive, {
      staff,
      exported,
      submitFn: (data) => crud.setActiveStatus(staff._id, data, { __options: { error: false } }),
    })
  );

  const { fetch, reset, sortByColumn, presets } = createEntityQueryActions({
    crud,
    getQuery: () => useStaffStore.getState().query,
    setQuery,
  });

  return {
    get state() {
      return useStaffStore.getState().list;
    },
    get pagination() {
      return useStaffStore.getState().pagination;
    },
    get loading() {
      return crud.loading;
    },
    set,
    add,
    update,
    remove,
    fetch,
    // create: guard(allow.create, crud.create),
    // edit: guard(allow.update, crud.edit),
    // delete: guard(allow.delete, crud.delete),
    // erase: guard(allow.erase, crud.erase),
    // retrieve: guard(allow.retrieve, crud.retrieve),
    // csv: crud.exportCsv,
    // xlsx: crud.exportXlsx,
    // pdf: crud.exportPdf,
    reset,
    sortByColumn,
    useStaffColumns,
    openCreate,
    openEdit,
    openDelete,
    openToggleActive,
    openErase,
    openRetrieve,
    filters: presets,
    allow,
  };
};
