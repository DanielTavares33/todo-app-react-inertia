import React, {useState} from 'react';
import {useForm, router} from "@inertiajs/react"
import {Button} from "../components/ui/button.tsx"
import {Input} from "../components/ui/input.tsx"
import {Label} from "../components/ui/label.tsx"
import {Plus, Trash, SquarePen} from "lucide-react"
import {
    Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table.tsx"
import EditTodoDialog from './components/EditTodoDialog.jsx'

export default function Index({todos}) {
    const {data, setData, post, processing, errors} = useForm({
        todo: ''
    });
    const [completedTodos, setCompletedTodos] = useState(new Set())

    function submit(e) {
        e.preventDefault()
        post('/create')
    }

    function destroy(id) {
        post(`/destroy/${id}`)
    }

    function handleChange(e) {
        const value = e.target.value;
        setData('todo', value)
    }

    const toggleComplete = (id) => {
        setCompletedTodos((prev) => {
            const newCompletedTodos = new Set(prev);
            if (newCompletedTodos.has(id)) {
                newCompletedTodos.delete(id)
            } else {
                newCompletedTodos.add(id)
            }
            return newCompletedTodos
        })
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-8 mt-32">
            <div className="gird w-full max-w-sm items-center gap-1.5 space-y-2">
                <form onSubmit={submit}>
                    <Label htmlFor="todo">Add Todo</Label>
                    <div className="flex items-center space-x-2">
                        <Input type="text" id="todo" value={data.todo} onChange={handleChange}/>
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
                            <TableRow key={todo.id} onClick={() => toggleComplete(todo.id)} className={completedTodos.has(todo.id) ? 'line-through' : ''}>
                                <TableCell className="font-medium">{todo.todo}</TableCell>
                                <TableCell
                                    className="font-medium text-right">{new Date(todo.created_at).toLocaleString()}</TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <EditTodoDialog todo={todo} />
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
