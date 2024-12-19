import React from 'react';
import { Button } from "../components/ui/button.tsx"
import { Input } from "../components/ui/input.tsx"
import { Plus } from "lucide-react"

const Index = () => {
    return (
        <div className="flex justify-center">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input />
                <Button>
                    <Plus />
                </Button>
            </div>
        </div>
    )
}

export default Index
