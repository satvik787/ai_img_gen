import MenuBar from "@/app/componenets/MenuBar";
import {Button} from "@/app/componenets/ui/button";

export default function Create() {
    return (
        <div className={"w-full h-full grid grid-cols-1 grid-rows-[10%_90%]"}>
            <MenuBar>
                <form method="POST" className={"w-full px-4 flex"}>
                    <input className={"w-full h-10 rounded-l-md border-none focus:outline-none p-2 text-purple-100 bg-primary"} type={"text"} placeholder={"Describe Your Image"} name={"img_desc"}></input>
                    <Button variant={"outline"} className={"hover:bg-teal-600 rounded-none border-none text-lg font-normal rounded-r-md bg-teal-600 text-purple-100"}>Generate</Button>
                </form>
            </MenuBar>
        </div>
    );
}

