import React, {useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../../components/ui/alert-dialog.tsx";
import {Button} from "../../components/ui/button.tsx";
import {SquarePen} from "lucide-react";
import {Input} from "../../components/ui/input.tsx";
import {useForm, router} from "@inertiajs/react";

export default function EditTodoDialog ({ todo }) {
    const { data, setData, put, processing, errors, wasSuccessful  } = useForm({
        todo: todo.todo,
    });

    function handleSave(e) {
        e.preventDefault()
        put(`/edit/${todo.id}`, {
            preserveScroll: true,
            onSuccess: (page) => {
                router.visit('/')
            }
        });
    }

    function handleChange(e) {
        setData('todo', e.target.value)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-600/90" size="sm">
                    <SquarePen />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input type="text" id="todo" value={data.todo} onChange={handleChange}/>
                        <span className="text-sm text-red-600">{errors.todo}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={processing} onClick={handleSave}>Save</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
