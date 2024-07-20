"use client";
import {Gallery} from "react-grid-gallery";
import { MouseEvent, useEffect, useRef, useState} from "react";
import {ArrowLeft, Eraser} from "lucide-react";

interface ImgViewProps{
    fileNames:Array<string>;
    edit:boolean;
}

function drawImageProp(ctx:CanvasRenderingContext2D, img:HTMLImageElement,offsetX:number=0.5, offsetY:number=0.5) {

    const x = 0,y = 0,w = ctx.canvas.width,h = ctx.canvas.height;

    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;


    let iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx:number, cy:number, cw:number, ch:number, ar = 1;

    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

export default function ImgView({fileNames,edit=false}:ImgViewProps) {
    const [clickedIndex, setClickedIndex] = useState<number>(-1);
    const [erase,setErase] = useState<boolean>(false);
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const clickedImage = useRef<HTMLImageElement>();
    const outerDiv = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(edit && canvasElement.current && clickedImage.current && outerDiv.current) {
            canvasElement.current.width = outerDiv.current.clientWidth;
            canvasElement.current.height = outerDiv.current.clientHeight;
            const ctx:CanvasRenderingContext2D = canvasElement.current.getContext("2d") as CanvasRenderingContext2D;
            drawImageProp(ctx,clickedImage.current);
            canvasElement.current.onmousedown = () =>{
                // @ts-ignore
                canvasElement.current.onmousemove = (ev)=>{
                    const x = ev.offsetX,y = ev.offsetY;
                    ctx.beginPath();
                    ctx.fillStyle = "white";
                    ctx.arc(x,y,5,0,Math.PI * 2,false);
                    ctx.fill();
                }
            }
            canvasElement.current.onmouseup = ()=>{
                // @ts-ignore
                canvasElement.current.onmousemove = null;
            }
        }
    },[clickedIndex,erase,edit]);

    function handleClick(index:number,item:any,e:MouseEvent<HTMLElement>){
        if(edit){
            setClickedIndex(index);
            clickedImage.current = e.target as HTMLImageElement;
        }
    }

    function handleBackClick(){
        setClickedIndex(-1);
        clickedImage.current = undefined;
    }

    if (typeof window === 'undefined' || typeof document === 'undefined') return <></>
    const obj = fileNames.map((src)=>{
        const img = new Image();
        img.src = src;
        return {
            src:img.src,
            width: img.width === 0 ? 300: img.width,
            height: img.height === 0? 200 : img.height,
        };
    })

    return (
        <div className={"w-full h-full relative row-start-2 row-end-3 overflow-scroll bg-Secondary p-4 rounded-lg"}>
            {
                clickedIndex === -1 &&
                <Gallery images={obj} onClick={handleClick} enableImageSelection={false} rowHeight={400}  />
            }
            {
                clickedIndex >= 0 &&
                <div ref={outerDiv} className={"w-full h-full"}>
                    <button
                        className={"w-8 h-8 z-10 left-6 top-6 flex items-center justify-center absolute bg-purple-100 rounded-full"}
                        onClick={handleBackClick}>
                        <ArrowLeft/>
                    </button>
                    <button
                        onClick={() => setErase((prevState => !prevState))}
                        className={"w-8 h-8 z-10 right-8 top-6 flex items-center justify-center absolute bg-purple-100 rounded-full"}>
                        <Eraser/>
                    </button>
                    <canvas ref={canvasElement}></canvas>
                </div>
            }
        </div>
    );
}

