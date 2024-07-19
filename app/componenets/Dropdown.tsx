'use client';
import React, {ReactElement, ReactNode, useState} from "react";
import {Button} from "@/app/componenets/ui/button";
import {Card} from "@/app/componenets/ui/card";

interface DropdownProps{
    name:string | ReactElement<HTMLElement>;
    children?:ReactNode
}

export default function Dropdown({name,children}: DropdownProps) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant={"outline"} className={"hover:bg-teal-600 border-none font-normal flex text-lg text-purple-100"} onClick={()=>setOpen((prevState)=>!prevState)}>
                {name}
            </Button>
            {
                open &&
                <Card className={"fixed right-4 rounded-md border-Secondary top-[90px] bg-Secondary min-w-32 p-2"}>
                    {children}
                </Card>
            }
        </>
    );
}


