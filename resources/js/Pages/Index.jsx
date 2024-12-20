import React from 'react';
import {Button} from "../components/ui/button.tsx"
import {Input} from "../components/ui/input.tsx"
import {Label} from "../components/ui/label.tsx"
import {Plus, Trash} from "lucide-react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table.tsx"

const Index = () => {
    return (
        <div className="flex flex-col justify-center items-center space-y-8 mt-32">
            <div className="gird w-full max-w-sm  items-center gap-1.5 space-y-2">
                <Label htmlFor="todo">Add Todo</Label>
                <div className="flex items-center space-x-2">
                    <Input type="text" id="todo" />
                    <Button>
                        <Plus/>
                    </Button>
                </div>
            </div>
            <div className="flex w-full max-w-2xl justify-center">
                <Table>
                    <TableCaption>A list of todos.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Todo</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell className="text-right">
                                <Button variant="destructive">
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Index
