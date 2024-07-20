import SideBar from "@/app/componenets/SideBar";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <div className={"grid grid-rows-1 grid-cols-[18%_82%] h-dvh p-2 sm:max-[500px]:grid-cols-[20%_80%]"}>
                <SideBar/>
                <div className={"col-start-2 col-end-3"}>
                    {children}
                </div>
            </div>
        </div>
    );
}

