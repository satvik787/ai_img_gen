'use client'
import React, {useEffect, useState} from 'react';
import {auth} from "@/firebase/config";
import {  onAuthStateChanged,User,signOut  } from "firebase/auth";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/app/componenets/ui/avatar";
import {Button} from "@/app/componenets/ui/button";
import {LogOut} from "lucide-react";

export default function UserBox() {
    const router = useRouter();
    const [user, setUser] = useState<User | {displayName:string}>({displayName:"temp"});

    const handleLogout =  () => {
         signOut(auth)
             .then(()=>{
                 console.log("LPG");
                 router.push("/login");
            })
             .catch((err)=>{
                 console.log(err.message);
            }
         );
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(result)=>{
            if(result){
                setUser(result);
            }else{
                router.push("/login");
            }
        });
        return ()=> unsubscribe();
    },[]);

    return (
        <>
            <div>
                <div className={"flex justify-start gap-4 items-center mb-5 px-2"}>
                    <Avatar className={"w-[40px] h-[40px] rounded-full bg-white"}>
                        <AvatarImage src={"/next.svg"} alt="profile picture"/>
                        <AvatarFallback>Profile Picture</AvatarFallback>
                    </Avatar>
                    <p className={"text-purple-50"}>{user!.displayName}</p>
                </div>
                <Button onClick={handleLogout} variant={"outline"} className={" px-4 py-2 gap-3 flex justify-start text-purple-100  border-none w-full  mb-6 hover:bg-teal-600 hover:text-accent-foreground font-semibold"}>
                    <LogOut/> Logout
                </Button>
            </div>
        </>
    );
}

