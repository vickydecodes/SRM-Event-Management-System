// student.module.jsx
"use client";

import { useStudentStore } from './student.store';
import { apiurls } from '@/core/api/api.urls';
import { createCrud as crudFactory } from '../../core/factory/entity.crud';
import { useStudentColumns } from './student.columns';
import { useUI } from '@/core/contexts/ui.context';
import { modals } from './student.modals';
import { guard } from '@/core/utils/permissions.util';
import { createEntityQueryActions } from '@/core/utils/entity.util';

export const useStudentModule = (exported) => {
  const store = useStudentStore();
  const { set, add, update, remove, setQuery } = store;
  const { openModal } = useUI();

  const urls = apiurls.students;

  const crud = crudFactory({
    entity: 'Student',
    urls,
    store,
    // getRole: () => user.role,     // uncomment when auth is integrated
  });

  // For development/testing - later replace with real permission checks
  const allow = {
    view: true,
    create: true,
    update: true,
    delete: true,
    erase: true,
    retrieve: true,
  };

  // Uncomment and adapt when permissions are ready
  /*
  const { user, permissions } = useAuth();
  const allow = {
    view: can(permissions, 'student', 'view', user),
    create: can(permissions, 'student', 'create', user),
    update: can(permissions, 'student', 'update', user),
    delete: can(permissions, 'student', 'delete', user),
    erase: can(permissions, 'student', 'erase', user),
    retrieve: can(permissions, 'student', 'retrieve', user),
  };
  */

  // Modal opening handlers with permission guard
  const openCreate = guard(allow.create, () =>
    openModal(modals.create, {
      submitFn: (data) => crud.create(data, { __options: { error: false } }),
      departments: exported?.departments || [],   // assuming you pass them from parent
      courses: exported?.courses || [],
      exported,
    })
  );

  const openEdit = guard(allow.update, (student) =>
    openModal(modals.edit, {
      student,
      departments: exported?.departments || [],
      courses: exported?.courses || [],
      exported,
      submitFn: (data) => crud.edit(student._id, data, { __options: { error: false } }),
    })
  );

  const openDelete = guard(allow.delete, (student) =>
    openModal(modals.delete, {
      id: student._id,
      submitFn: () => crud.delete(student._id, { __options: { error: false } }),
    })
  );

  const openErase = guard(allow.erase, (student) =>
    openModal(modals.erase, {
      id: student._id,
      submitFn: () => crud.erase(student._id, { __options: { error: false } }),
    })
  );

  const openRetrieve = guard(allow.retrieve, (student) =>
    openModal(modals.retrieve, {
      id: student._id,
      submitFn: () => crud.retrieve(student._id, { __options: { error: false } }),
    })
  );

  // Optional: if you have toggle active status for students
  /*
  const openToggleActive = guard(allow.update, (student) =>
    openModal(modals.toggleActive, {
      student,
      exported,
      submitFn: (data) => crud.setActiveStatus(student._id, data, { __options: { error: false } }),
    })
  );
  */

  const { fetch, reset, sortByColumn, presets } = createEntityQueryActions({
    crud,
    getQuery: () => useStudentStore.getState().query,
    setQuery,
  });

  return {
    get state() {
      return useStudentStore.getState().list;
    },
    get pagination() {
      return useStudentStore.getState().pagination;
    },
    get loading() {
      return crud.loading;
    },

    set,
    add,
    update,
    remove,

    fetch,
    reset,
    sortByColumn,

    useStudentColumns,

    openCreate,
    openEdit,
    openDelete,
    openErase,
    openRetrieve,
    // openToggleActive,     // uncomment if needed

    filters: presets,
    allow,
  };
};