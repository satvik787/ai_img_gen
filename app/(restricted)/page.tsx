import MenuBar from "@/app/componenets/MenuBar";
import {Calendar, CarFront, Cat, Mountain, Pizza, Shell} from "lucide-react";
import React from "react";
import ImgView from "@/app/componenets/ImgView";
import {getImages, Res} from "@/action/images";

export  default async function Home({searchParams}: {searchParams?: any}) {
    const {search} = searchParams
    const images:Res<Array<string>> = await getImages(search);
    return (
        <div className={"w-full h-full grid grid-cols-1 grid-rows-[10%_90%] "}>
            <MenuBar className={" row-start-1 row-end-2 justify-between"}>
                <MenuBar.Link to={"/?search=daily"}>
                    <Calendar className={"min-w-6"}/>  <span className={"sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Daily Theme</span>
                </MenuBar.Link>
                <MenuBar.Link to={"/?search=animals"}>
                    <Cat className={"min-w-6"}/>
                    <span className={"sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Animals</span>
                </MenuBar.Link>
                <MenuBar.Link to={"/?search=anime"}>
                    <Shell className={"min-w-6"}/> <span className={"sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Anime</span>
                </MenuBar.Link>
                <MenuBar.Link to={"/?search=food"}>
                    <Pizza className={"min-w-6"}/>
                    <span className={"sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Food</span>
                </MenuBar.Link>
                <MenuBar.Link to={"/?search=vehicles"}>
                    <CarFront className={"min-w-6"}/>
                    <span className={"sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Vehicles</span>
                </MenuBar.Link>
                <MenuBar.Link to={"/?search=landscapes"}>
                    <Mountain className={"min-w-6"} />
                    <span className={"sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>Landscapes</span>
                </MenuBar.Link>
            </MenuBar>
            <div className={"px-2 pt-2"}>
                <ImgView edit={false} fileNames={images.data!}/>
            </div>
        </div>
    );
}
