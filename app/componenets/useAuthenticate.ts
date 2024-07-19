'use client';
import { useEffect, useState } from 'react';
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "@/firebase/config";
import {useRouter} from "next/navigation";

interface UserData{
    displayName: string;
    uid:string;
    photoUrl:string | null;
}
export default function useAuthenticate() {
    const router = useRouter();
    const [user, setUser] = useState<UserData>();
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(result)=>{
            if(result){
                setUser({displayName:result.displayName!,uid:result.uid,photoUrl:result.photoURL});
            }else{
                router.push("/login");
            }
        });
        return ()=> unsubscribe();
    },[router]);


    return user;
}