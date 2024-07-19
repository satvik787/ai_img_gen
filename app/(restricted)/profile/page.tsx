import React from 'react';
import MenuBar from "@/app/componenets/MenuBar";
import {Heart ,Images ,ArrowDownNarrowWide} from "lucide-react";
import Dropdown from "@/app/componenets/Dropdown";
export default function Profile() {
    return (
        <div className={"w-full h-full grid grid-cols-1 grid-rows-[10%_90%]"}>
            <MenuBar className={" row-start-1 row-end-2 "}>
                <div className={"flex"}>
                    <MenuBar.Link to={"./?search=my_images"}><Images/> My Images</MenuBar.Link>
                    <MenuBar.Link to={"./?search=my_likes"}><Heart/> My Likes</MenuBar.Link>
                </div>
                <Dropdown name={
                    <div className={"flex gap-2"}>
                        Sort
                        <ArrowDownNarrowWide/>
                    </div>
                }>
                    <MenuBar.Link to={"./?sort=new"}>latest</MenuBar.Link>
                    <MenuBar.Link to={"./?sort=old"}>Oldest</MenuBar.Link>
                </Dropdown>
            </MenuBar>
        </div>
    );
}


