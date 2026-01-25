// student.modal.component.jsx
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
import StudentForm from './student.form';
import { studentSchema } from './student.schema'; // ← You need to create this

export const Create = ({ submitFn, closeModal, departments = [], courses = [] }) => {
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      registerNumber: '',
      name: '',
      email: '',
      contact: '',
      department: '',
      course: '',
      year: undefined,
      // password: ''    // usually added only in create - depends on your policy
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
    <DialogContent className="sm:max-w-[600px]" key="create-student">
      <DialogHeader>
        <DialogTitle>Create Student</DialogTitle>
        <DialogDescription>Add a new student to the system</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <StudentForm form={form} departments={departments} courses={courses} />

          {ErrorAlert}

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={loading}
              loading={loading}
              loadingText="Creating student..."
            >
              Create Student
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export const Edit = ({ student, submitFn, closeModal, departments = [], courses = [] }) => {
  const form = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      registerNumber: student.registerNumber || '',
      name: student.name || '',
      email: student.email || '',
      contact: student.contact || '',
      department: student.department?._id || student.department || '',
      course: student.course?._id || student.course || '',
      year: student.year || undefined,
      // password is usually NOT prefilled/edited here
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
    <DialogContent className="sm:max-w-[600px]" key="edit-student">
      <DialogHeader>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogDescription>Update student information</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <StudentForm form={form} departments={departments} courses={courses} />

          {ErrorAlert}

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={loading}
              loading={loading}
              loadingText="Saving changes..."
            >
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
    <DialogContent className="sm:max-w-[425px]" key="delete-student">
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This will mark the student as deleted. The record can be restored by an administrator later.
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
          Delete Student
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export const Erase = ({ id, submitFn, closeModal }) => (
  <DialogContent className="sm:max-w-[425px]" key="erase-student">
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription className="text-destructive">
        <strong>Warning:</strong> This action is permanent and irreversible. 
        All student data including related records will be permanently deleted.
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
        Erase Permanently
      </Button>
    </DialogFooter>
  </DialogContent>
);

export const Retrieve = ({ id, submitFn, closeModal }) => (
  <DialogContent className="sm:max-w-[425px]" key="retrieve-student">
    <DialogHeader>
      <DialogTitle>Restore Student?</DialogTitle>
      <DialogDescription>
        This will restore the student record and make it active again in the system.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button
        variant="default"  // or "success" if you have that variant
        onClick={() => {
          submitFn(id);
          closeModal();
        }}
      >
        Restore Student
      </Button>
    </DialogFooter>
  </DialogContent>
);