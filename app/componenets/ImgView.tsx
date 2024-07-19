"use client";
import {Gallery} from "react-grid-gallery";

interface ImgViewProps{
    fileNames:Array<string>
}
export default function ImgView({fileNames}:ImgViewProps) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return <></>
    const obj = fileNames.map((src)=>{
        const img = new Image();
        img.src = src;
        return {
            src:img.src,
            width: img.width,
            height: img.height,
        };
    })
    return (
        <div className={"w-full h-full row-start-2 row-end-3 overflow-scroll bg-Secondary p-4 rounded-lg"}>
            <Gallery images={obj} enableImageSelection={false} rowHeight={400} margin={5} />
        </div>
    );
}

