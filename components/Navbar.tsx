"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Logo } from "@/components/logo"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import DropdownItem from "./Dropdown"

export const Navbar = () => {

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('user');
        router.push("/login")

    }

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center justify-normal">
            {/* Mobile Sidebar */}
            <div className="flex items-center gap-x-4">
                <a href="/">
                    <div className="text-lg font-bold text-neutral-700 pb-1 pl-7" >
                        Trello
                    </div>
                </a>

                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownItem
                        title="Workspace"
                        options={['Tùy chọn 1.1', 'Tùy chọn 1.2', 'Tùy chọn 1.3']}
                    />
                    <DropdownItem
                        title="Recent"
                        options={['Tùy chọn 2.1', 'Tùy chọn 2.2', 'Tùy chọn 2.3']}
                    />
                    <DropdownItem
                        title="Starred"
                        options={['Tùy chọn 3.1', 'Tùy chọn 3.2', 'Tùy chọn 3.3']}
                    />
                    <DropdownItem
                        title="Template"
                        options={['Tùy chọn 4.1', 'Tùy chọn 4.2', 'Tùy chọn 4.3']}
                    />
                </div>

                <Button size="sm" variant="primary" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                    Create
                </Button>
                <Button size="sm" variant="primary" className="rounded-sm block md:hidden">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <Button size="sm" variant="primary" onClick={logout} className="rounded-sm block">
                    <span className="m-2 text-xs"> Logout </span>
                </Button>
            </div>
        </nav>
    )
}