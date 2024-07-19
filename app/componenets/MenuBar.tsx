import Link from "next/link";
import React, {ReactNode} from "react";

interface MeniLinkProps{
    children?:ReactNode;
    to: string;
}

function MenuLink({children,to}:MeniLinkProps){
    return (
        <Link href={to}
              className={"flex  gap-2 h-10 px-4 py-2 text-purple-100  rounded-md  hover:bg-teal-600 hover:text-accent-foreground "}>
            {children}
        </Link>
    );
}

export default function MenuBar({children,className}:{children:ReactNode,className?:string}) {
    return (
        <div className={"flex row-start-1 row-end-2 bg-Secondary rounded-md mx-2 items-center px-4" + className} >
            {children}
        </div>

    );
}

MenuBar.Link = MenuLink;