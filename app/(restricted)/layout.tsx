import SideBar from "@/app/componenets/SideBar";
import {Bot, Folder, Search} from "lucide-react"

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <div className={"grid grid-rows-1 grid-cols-[18%_82%] h-dvh p-2 "}>
                <SideBar>
                    <SideBar.Link to={"/"}><Search/> Explore</SideBar.Link>
                    <SideBar.Link to={"/create"}><Bot/>Generate</SideBar.Link>
                    <SideBar.Link to={"/profile"}><Folder/> My Creations</SideBar.Link>
                </SideBar>
                <div className={"col-start-2 col-end-3"}>
                    {children}
                </div>
            </div>
        </div>
    );
}

