'use client'
import React from 'react';
import {auth} from "@/firebase/config";
import {  signOut  } from "firebase/auth";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/app/componenets/ui/avatar";
import {Button} from "@/app/componenets/ui/button";
import {LogOut} from "lucide-react";
import useAuthenticate from "@/app/componenets/useAuthenticate";
import {removeSession} from "@/action/session";

export default function UserBox() {
    const router = useRouter();
    const user = useAuthenticate();
    const handleLogout = () => {
         signOut(auth)
             .then(()=>{
                 removeSession()
            })
             .catch((err)=>{
                 console.log(err.message);
            }
         );
    }

    return (
        <>
            {
                user &&
                <div>
                    <div className={"flex justify-start gap-4 items-center mb-5 px-2"}>
                        <Avatar className={"w-[40px] h-[40px] rounded-full bg-white "}>
                            <AvatarImage src={user.photoUrl !== null ? user.photoUrl : "/next.svg"} alt="profile picture"/>
                            <AvatarFallback>Profile Picture</AvatarFallback>
                        </Avatar>
                        <p className={"text-purple-50 sm:max-[1000px]:hidden sm:max-[1200px]:text-xs sm:max-[1200px]:pt-1"}>{user.displayName}</p>
                    </div>
                    <Button onClick={handleLogout} variant={"outline"}
                            className={" px-4 py-2 gap-3 flex justify-start text-purple-100  border-none w-full  mb-6 hover:bg-teal-600 hover:text-accent-foreground font-semibold"}>
                        <LogOut className={"min-w-6"}/> <span className={"sm:max-[1000px]:hidden md:max-[1000px]:text-sm"}>Logout</span>
                    </Button>
                </div>
            }
        </>
    );
}

