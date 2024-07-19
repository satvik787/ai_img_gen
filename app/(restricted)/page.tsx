import MenuBar from "@/app/componenets/MenuBar";
import {Calendar, CarFront, Cat, Mountain, Pizza, Shell} from "lucide-react";
import React from "react";
import ImgView from "@/app/componenets/ImgView";
import {getAllImages, Res} from "@/action/images";

export  default async function Home() {
    const images:Res<Array<string>> = await getAllImages();
    return (
        <div className={"w-full h-full grid grid-cols-1 grid-rows-[10%_90%]"}>
            <MenuBar className={" row-start-1 row-end-2 "}>
                <MenuBar.Link to={"/?search=daily Theme"}><Calendar/> Daily Theme</MenuBar.Link>
                <MenuBar.Link to={"/?search=animals"}><Cat/> Animals</MenuBar.Link>
                <MenuBar.Link to={"/?search=anime"}><Shell/> Anime</MenuBar.Link>
                <MenuBar.Link to={"/?search=food"}><Pizza/> Food</MenuBar.Link>
                <MenuBar.Link to={"/?search=vehicles"}><CarFront/> Vehicles</MenuBar.Link>
                <MenuBar.Link to={"/?search=landscapes"}><Mountain/> Landscapes</MenuBar.Link>
            </MenuBar>
            <div className={"px-2 pt-2"}>
                <ImgView fileNames={images.data}/>
            </div>
        </div>
    );
}
