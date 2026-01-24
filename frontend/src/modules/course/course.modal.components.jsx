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
import CourseForm from './course.form';
import { courseSchema } from './course.schema';
import { useLoader } from '@/core/hooks/useLoader';
import { useEffect } from 'react';
import { safeId } from '@/core/utils/normalize-id';
import { safetext } from '@/core/utils/safetext.util';

export const Create = ({ submitFn, exported, closeModal }) => {
    const { createPreset } = useLoader();
    const departments = exported.departments;


    const courseModal = createPreset(departments)

    useEffect(() => {
        courseModal();
    }, [])


    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: '',
            code: '',
            duration: '',
            department: '',
            description: '',
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
                <DialogTitle>Create Course</DialogTitle>
                <DialogDescription>Add a new Course</DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
                    <CourseForm form={form} departments={departments.state} />

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

export const Edit = ({ course, exported, submitFn, closeModal }) => {
    const { createPreset } = useLoader();
    const departments = exported.departments;


    const courseModal = createPreset(departments)

    useEffect(() => {
        courseModal();
    }, [])

    const form = useForm({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: course.name || '',
            description: course.description || '',
            code: course.code || '',
            duration: safetext(course.duration) || '',
            department: safeId(course.department) || '',
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
                <DialogTitle>Edit Course</DialogTitle>
                <DialogDescription>Modify Course details</DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2">
                    <CourseForm form={form} departments={departments.state} />
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
                    This will be stored as deleted, this Course record can be retrieved by Admin.
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
                <strong>Note:</strong> this operation is irreversible. All the data related to this Course
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
                <strong>Note:</strong> this operation is retrieve All the data related to this Course will be
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

