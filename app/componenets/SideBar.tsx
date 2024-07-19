import {ReactNode} from 'react';
import {Brain } from "lucide-react"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/app/componenets/ui/card";
import Link from "next/link";
import UserBox from "@/app/componenets/UserBox";


interface MeniLinkProps{
    children?:ReactNode;
    to: string;
}

function MenuLink({children,to}: MeniLinkProps){
    return (
        <Link href={to}
              className={"h-10 px-4 py-2 gap-3 flex justify-start text-purple-100  border-none w-full rounded-md mb-6 hover:bg-teal-600 hover:text-accent-foreground font-semibold"}>
            {children}
        </Link>
    )
}
export default function SideBar({children}:{children:ReactNode}) {
    return (
        <div className={"h-full col-start-1 col-end-2 box-border "}>
            <Card className={"h-full border-secondary bg-Secondary flex flex-col justify-between"}>
                <div>
                    <CardHeader>
                        <CardTitle className={"text-purple-200"}>
                            <Brain/>Gen AI
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                </div>
                <CardFooter>
                    <UserBox></UserBox>
                </CardFooter>
            </Card>
        </div>
    );
}
SideBar.Link = MenuLink;

