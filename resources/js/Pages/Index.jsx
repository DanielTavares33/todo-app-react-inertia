import React from 'react';
import {useForm, router} from "@inertiajs/react"
import {Button} from "../components/ui/button.tsx"
import {Input} from "../components/ui/input.tsx"
import {Label} from "../components/ui/label.tsx"
import {Plus, Trash, SquarePen} from "lucide-react"
import {
    Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table.tsx"


export default function Index({todos}) {
    const {data, setData, post, processing, errors} = useForm({
        todo: ''
    });

    function submit(e) {
        e.preventDefault()
        post('/create') // TODO: Add notification onSuccess
    }

    function destroy(id) {
        post(`/destroy/${id}`)
    }

    function gotToEditPage(id) {
        router.visit(`/edit/${id}`)
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-8 mt-32">
            <div className="gird w-full max-w-sm items-center gap-1.5 space-y-2">
                <form onSubmit={submit}>
                    <Label htmlFor="todo">Add Todo</Label>
                    <div className="flex items-center space-x-2">
                        <Input type="text" id="todo" value={data.todo} onChange={e => setData('todo', e.target.value)}/>
                        <Button type="submit" disabled={processing}>
                            <Plus/>
                        </Button>
                    </div>
                    <span className="text-sm text-red-600">{errors.todo}</span>
                </form>
            </div>
            <div className="flex w-full max-w-2xl justify-center">
                <Table>
                    <TableCaption>A list of todos.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Todo</TableHead>
                            <TableHead className="text-right">Created At</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((todo) => (
                            <TableRow key={todo.id}>
                                <TableCell className="font-medium">{todo.todo}</TableCell>
                                <TableCell
                                    className="font-medium text-right">{new Date(todo.created_at).toLocaleString()}</TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    {/* TODO: Add action to edit selected row using Alert Dialog component*/}
                                    <Button className="bg-amber-600 hover:bg-amber-600/90" size="sm">
                                        <SquarePen/>
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => destroy(todo.id)}>
                                        <Trash/>
                                    </Button>
                                </TableCell>
                            </TableRow>))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
