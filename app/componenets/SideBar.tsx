import {ReactNode} from 'react';
import {Bot, Brain, Folder, Search} from "lucide-react"
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
export default function SideBar() {
    return (
        <div className={"h-full col-start-1 col-end-2 box-border "}>
            <Card className={"h-full border-secondary bg-Secondary flex flex-col justify-between"}>
                <div>
                    <CardHeader>
                        <CardTitle className={"text-purple-200"}>
                            <Brain /><span className={"sm:max-[700px]:hidden"}>Gen AI</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MenuLink to={"/"}>
                            <Search className={"min-w-6"}/> <span className={"sm:max-[1000px]:hidden  sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Explore</span>
                        </MenuLink>
                        <MenuLink to={"/create"}>
                            <Bot className={"min-w-6"}/><span className={"sm:max-[1000px]:hidden  sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Generate</span>
                        </MenuLink>
                        <MenuLink to={"/profile"}>
                        <Folder className={"min-w-6"}/> <span className={"sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>My Creations</span>
                        </MenuLink>
                    </CardContent>
                </div>
                <CardFooter>
                    <UserBox></UserBox>
                </CardFooter>
            </Card>
        </div>
    );
}

