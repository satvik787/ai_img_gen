'use client'
import MenuBar from "@/app/componenets/MenuBar";
import {Button} from "@/app/componenets/ui/button";
import { useFormState,useFormStatus  } from 'react-dom';
import {CircleAlert} from "lucide-react";
import {generateImage} from "@/action/images";
import {useEffect, useState} from "react";
import { toast } from "sonner"
import ImgView from "@/app/componenets/ImgView";
import useAuthenticate from "@/app/componenets/useAuthenticate";

function FormSubmit(){
    const status = useFormStatus();
    return (
        <>
            <Button variant={"outline"} disabled={status.pending} className={"hover:bg-teal-600  border-none text-lg font-normal text-purple-100"}>Generate</Button>
        </>
    );
}

export default function Create() {
    const [state, serverAction] = useFormState(generateImage, null);
    const [images, setImages] = useState<Array<string>>([]);
    const user = useAuthenticate();
    useEffect(() => {
        if (state) {
            if (state.ok) {
                setImages((prevState)=>[...prevState,state.data!]);
            } else {
                toast(<span> <CircleAlert/> {state.msg}</span>, {
                    className: "bg-red-500 text-white border-none shadow-lg"
                });
            }
        }
    },[state]);
    return (
        <>
            {
                user !== undefined &&
                <div className={"w-full h-full grid grid-cols-1 grid-rows-[10%_90%] "}>
                    <MenuBar>
                        <form className={"w-full px-4 flex"} action={serverAction}>
                            <input autoComplete={"off"}
                                   className={"w-full rounded-l-md border-none focus:outline-none p-2 text-purple-100 bg-Secondary"}
                                   type={"text"} placeholder={"Describe Your Image"} name={"img_desc"} minLength={3}
                                   required></input>
                            <input autoComplete={"off"} className={"hidden"} type={"text"} name={"uid"} value={user.uid}/>
                            <FormSubmit />
                        </form>
                    </MenuBar>
                    <div className={"px-2 pt-2"}>
                        <ImgView edit={false} fileNames={images}/>

                    </div>
                </div>
            }
        </>
    );
}

