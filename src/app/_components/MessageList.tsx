"use client";

import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";


import {PusherWebClient} from "@/app/pusher";

 function MessageList() {
    const [messages, setMessages]=useState<Array<string>>([])

    useEffect(()=>{
        const channel=PusherWebClient.subscribe('test')
        channel.bind('test',(messageObj:{test:string})=> {
            setMessages(pr=>([...pr,messageObj.test]))
        })

        return ()=>PusherWebClient.unsubscribe('test')
    },[])



    return (<div>{messages.map((message,i)=>(<h3 key={i} color={'#FFFFFF'}>{message}</h3>))}</div>);

}

export default MessageList
