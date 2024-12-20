import React from 'react'
import {useForm, router} from "@inertiajs/react"
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {SquarePen} from "lucide-react";

export default function Show({todo}) {
    const { data, setData, post, processing, errors } = useForm({
        newTodo: ''
    })

    function submit(e) {
        e.preventDefault()
        post(`/edit/${todo.id}`)
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-8 mt-32">
            <div className="gird w-full max-w-sm  items-center gap-1.5 space-y-2">
                <form>
                    <Label htmlFor="todo">Edit Todo</Label>
                    <div className="flex items-center space-x-2">
                        <Input type="text" id="todo" value={todo.todo} onChange={e => setData('newTodo', e.target.value)}/>
                        <Button type="submit" className="bg-amber-600 hover:bg-amber-500" >
                            <SquarePen/>
                        </Button>
                    </div>
                    {/*<span className="text-sm text-red-600">{errors.todo}</span>*/}
                </form>
            </div>
        </div>
    )
}
