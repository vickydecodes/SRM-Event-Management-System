import { useHallStore } from './hall.store';
import { apiurls } from '@/core/api/api.urls';
import { createCrud as crudFactory } from '../../core/factory/entity.crud';
// import { useDepartmentColumns } from './department.columns';
// import { useUI } from '@/core/contexts/ui.context';
// import { modals } from './batch.modals';
// import { useBatchColumns } from './batch.columns';
// import { useAuth } from '@/core/contexts/auth.context';
import { guard } from '@/core/utils/permissions.util';
import { createEntityQueryActions } from '@/core/utils/entity.util';
// import { modals } from './department.modals';
import { HallCarousel } from './hall.columns';

export const useHallModule = (exported) => {
  const store = useHallStore();
  //   const { user, permissions } = useAuth();
  const { set, add, update, remove, setQuery } = store;
//   const { openModal } = useUI();

  const urls = apiurls.halls;

  const crud = crudFactory({
    entity: 'Hall ',
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

//   const openCreate = guard(allow.create, () =>
//     openModal(modals.create, {
//       submitFn: (data) => crud.create(data, { __options: { error: false } }),
//       exported,
//     })
//   );

//   const openEdit = guard(allow.update, (batch) =>
//     openModal(modals.edit, {
//       batch,
//       exported,
//       submitFn: (data) => crud.edit(batch._id, data, { __options: { error: false } }),
//     })
//   );

//   const openDelete = guard(allow.delete, (batch) =>
//     openModal(modals.delete, {
//       id: batch._id,
//       submitFn: () => crud.delete(batch._id, { __options: { error: false } }),
//     })
//   );

//   const openErase = guard(allow.erase, (batch) =>
//     openModal(modals.erase, {
//       id: batch._id,
//       submitFn: () => crud.erase(batch._id, { __options: { error: false } }),
//     })
//   );

//   const openRetrieve = guard(allow.retrieve, (batch) =>
//     openModal(modals.retrieve, {
//       id: batch._id,
//       submitFn: () => crud.retrieve(batch._id, { __options: { error: false } }),
//     })
//   );

//   const openToggleActive = guard(allow.update, (batch) =>
//     openModal(modals.toggleActive, {
//       batch,
//       exported,
//       submitFn: (data) => crud.setActiveStatus(batch._id, data, { __options: { error: false } }),
//     })
//   );

  const { fetch, reset, sortByColumn, presets } = createEntityQueryActions({
    crud,
    getQuery: () => useHallStore.getState().query,
    setQuery,
  });

  return {
    get state() {
      return useHallStore.getState().list;
    },
    get pagination() {
      return useHallStore.getState().pagination;
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
    HallCarousel,
    // useDepartmentColumns,
    // openCreate,
    // openEdit,
    // openDelete,
    // openToggleActive,
    // openErase,
    // openRetrieve,
    filters: presets,
    allow,
  };
};
