import { apiurls } from '@/core/api/api.urls';
import { createCrud as crudFactory } from '@/core/factory/entity.crud';
import { useCourseColumns } from './course.columns';
import { useUI } from '@/core/contexts/ui.context';
// import { modals } from './course.modals';
// import { usecourseColumns } from './course.columns';
// import { useAuth } from '@/core/contexts/auth.context';
import { guard } from '@/core/utils/permissions.util';
import { createEntityQueryActions } from '@/core/utils/entity.util';
import { modals } from './course.modals';
import { useCourseStore } from './course.store';

export const useCourseModule = (exported) => {
  const store = useCourseStore();
  //   const { user, permissions } = useAuth();
  const { set, add, update, remove, setQuery } = store;
  const { openModal } = useUI();

  const urls = apiurls.courses;

  const crud = crudFactory({
    entity: 'Course',
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

  const openEdit = guard(allow.update, (course) =>
    openModal(modals.edit, {
      course,
      exported,
      submitFn: (data) => crud.edit(course._id, data, { __options: { error: false } }),
    })
  );

  const openDelete = guard(allow.delete, (course) =>
    openModal(modals.delete, {
      id: course._id,
      submitFn: () => crud.delete(course._id, { __options: { error: false } }),
    })
  );

  const openErase = guard(allow.erase, (course) =>
    openModal(modals.erase, {
      id: course._id,
      submitFn: () => crud.erase(course._id, { __options: { error: false } }),
    })
  );

  const openRetrieve = guard(allow.retrieve, (course) =>
    openModal(modals.retrieve, {
      id: course._id,
      submitFn: () => crud.retrieve(course._id, { __options: { error: false } }),
    })
  );

  const openToggleActive = guard(allow.update, (course) =>
    openModal(modals.toggleActive, {
      course,
      exported,
      submitFn: (data) => crud.setActiveStatus(course._id, data, { __options: { error: false } }),
    })
  );

  const { fetch, reset, sortByColumn, presets } = createEntityQueryActions({
    crud,
    getQuery: () => useCourseStore.getState().query,
    setQuery,
  });

  return {
    get state() {
      return useCourseStore.getState().list;
    },
    get pagination() {
      return useCourseStore.getState().pagination;
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
    useCourseColumns,
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
