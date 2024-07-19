import React from 'react';
import MenuBar from "@/app/componenets/MenuBar";
import {getMyImages} from "@/action/images";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import ImgView from "@/app/componenets/ImgView";
export default async function Profile({searchParams}: {searchParams?: any}) {
    const uid = cookies().get("SESSION")?.value || null;
    if(uid === null)redirect("/login");
    const {sort} = searchParams;
    const myImages = await getMyImages(uid,sort === "new");
    return (
        <div className={"w-full h-full grid grid-cols-1 grid-rows-[10%_90%]"}>
            <MenuBar className={" row-start-1 row-end-2 justify-start"}>
                {/*<div className={"invisible"}>*/}
                {/*    <MenuBar.Link to={"./?search=my_images"}><Images/> My Images</MenuBar.Link>*/}
                {/*    <MenuBar.Link to={"./?search=my_likes"}><Heart/> My Likes</MenuBar.Link>*/}
                {/*</div>*/}
                <MenuBar.Link to={"profile/?sort=new"}>latest</MenuBar.Link>
                <MenuBar.Link to={"profile/?sort=old"}>Oldest</MenuBar.Link>
            </MenuBar>
            <div className={"px-2 pt-2"}>
                <ImgView edit={true} fileNames={myImages.map((img)=>img.url)}/>
            </div>
        </div>
    );
}


