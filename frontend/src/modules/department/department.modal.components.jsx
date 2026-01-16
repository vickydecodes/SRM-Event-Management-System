import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAsync } from '@/core/hooks/useAsync';
import { useClearError } from '@/core/hooks/useClearError';
import { useSubmit } from '@/core/hooks/useSubmit';
import DepartmentForm from './department.form';
import { departmentSchema } from './department.schema';

export const Create = ({ submitFn, closeModal }) => {
  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      description: '',
      email: '',
      phone: '',
    },
  });

  const { run, loading, ErrorAlert, clearError } = useAsync(submitFn);

  useClearError(form, clearError);

  const onSubmit = useSubmit({
    run,
    form,
    onSuccess: closeModal,
  });

  return (
    <DialogContent className="sm:max-w-[500px]" key="create">
      <DialogHeader>
        <DialogTitle>Create Department</DialogTitle>
        <DialogDescription>Add a new department</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
          <DepartmentForm form={form} />

          {ErrorAlert}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" loading={loading} loadingText={'Saving your board..'}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export const Edit = ({ department, submitFn, closeModal }) => {


  const form = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: department.name || '',
      description: department.description || '',
      email: department.email || '',
      phone: department.phone || '',
    },
  });

  const { run, loading, ErrorAlert, clearError } = useAsync(submitFn);

  useClearError(form, clearError);

  const onSubmit = useSubmit({
    run,
    form,
    onSuccess: closeModal,
  });

  return (
    <DialogContent className="sm:max-w-[500px]" key="edit">
      <DialogHeader>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogDescription>Modify department details</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
          <DepartmentForm form={form} />
          {ErrorAlert}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" loading={loading} loadingText={'Editing your board..'}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export const Delete = ({ id, submitFn, closeModal }) => {
  return (
    <DialogContent className="sm:max-w-[425px] pe-10" key="delete">
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This will be stored as deleted, this department record can be retrieved by Admin.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>

        <Button
          variant="destructive"
          onClick={() => {
            submitFn(id);
            closeModal();
          }}
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
export const Erase = ({ id, submitFn, closeModal }) => (
  <DialogContent className="sm:max-w-[425px] pe-10">
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        <strong>Note:</strong> this operation is irreversible. All the data related to this department
        will be lost.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button
        onClick={() => {
          submitFn(id);
          closeModal();
        }}
        variant="success"
      >
        Erase
      </Button>
    </DialogFooter>
  </DialogContent>
);
export const Retrieve = ({ id, submitFn, closeModal }) => (
  <DialogContent className="sm:max-w-[425px] pe-10">
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        <strong>Note:</strong> this operation is retrieve All the data related to this department will be
        back.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button
        onClick={() => {
          submitFn(id);
          closeModal();
        }}
        variant="destructive"
      >
        Retrieve
      </Button>
    </DialogFooter>
  </DialogContent>
);

