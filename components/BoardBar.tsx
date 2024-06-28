"use client"

import { Button } from "@/components/ui/button"
import { Columns3, Star, Users } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function BoardBar({ params }: { params: { boardId: string } }) {

    return (
        <nav className="fixed top-14 z-50 px-4 w-full h-14 border-b shadow-sm bg-slate-200 flex items-center justify-normal">
            {/* Mobile Sidebar */}
            <div className="flex items-center gap-x-4 pl-10">
                    <div className="text-lg font-bold text-neutral-700 pb-1 pl-7">
                    {params.boardId}
                    </div>
                <Star size={16} className="-mt-1"/>
                <Users size={16} className="-mt-1"/>
                <Button size={"sm"} variant="ghost" className="flex columns-2 rounded-sm -mt-1">
                    <Columns3 />
                    <span className="m-2 text-xs"> Board </span>
                </Button>

            </div>
            <div className="ml-auto flex items-center gap-x-2">

            </div>
        </nav>
    )
}