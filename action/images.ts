'use server'
import fs from "fs";
import path from "node:path";
export interface Res<T>{
    ok:boolean;
    data:T
}
export async function getAllImages():Promise<Res<Array<string>>> {
    return new Promise((resolve,reject)=>{
        fs.readdir("./public/genImgs",(err,files)=>{
            if(err){
                reject({ok:false,msg:err.message});
            }else{
                files = files.map((file)=>path.join("genImgs",file))
                resolve({ok:true,data:files});
            }
        });
    })
}