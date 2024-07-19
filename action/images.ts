'use server'
import fs from "fs";
import path from "path";
import {headers} from "next/headers";
import {Ratelimit} from "@upstash/ratelimit";
import {kv} from "@vercel/kv";

const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
});

export interface Res<T>{
    ok:boolean;
    data?:T
    msg?:string;
}

export async function getImages(query:string):Promise<Res<Array<string>>> {
    const exist = query !== undefined && fs.existsSync(path.join("./public",query),);
    query = !exist ? "genImgs":query;
    return new Promise((resolve,reject)=>{
        fs.readdir(path.join("./public",query),(err,files)=>{
            if(err){
                reject({ok:false,msg:err.message});
            }else{
                files = files.map((file)=>path.join(query,file))
                resolve({ok:true,data:files});
            }
        });
    })
}



export async function getMyImages(uid:string,reverse=true){
    const list:Array<{url:string,time:number}> = await kv.lrange(uid,0,-1);
    list.sort((a,b)=>a.time - b.time);
    if(reverse){
        list.reverse();
    }
    return list;
}

export async function generateImage(init:any,formData:FormData):Promise<Res<string>>{
    const headerList = headers()
    const IP = headerList.get("x-real-ip") || headerList.get("x-forwarded-for");
    const query = <string> formData.get("img_desc");
    const uid = <string> formData.get("uid");
    if(IP === null || query === null || uid === null)return {ok:false,msg:"empty fields"};
    const { success } = await ratelimit.limit(IP);
    if(success){
        const url = new URL("https://api.unsplash.com/search/photos");
        url.searchParams.append("client_id",process.env.IMG_API_ACCESS_KEY!);
        url.searchParams.append("query",query);
        url.searchParams.append("per_page",'1');
        const res = await fetch(url);
        try{
            if(res.ok){
                const json = await res.json();
                const url = json.results[0].urls.regular;
                await kv.lpush(uid,{url,time:Date.now()});
                return {ok:true,data:url};
            }
        }catch (e){
            console.log(e);
        }
        return {ok:false,msg:"failed to generate image"};
    }
    return {ok:false,msg:"You have reached the limit of 3 calls per hour. Please wait before making further requests"}
}