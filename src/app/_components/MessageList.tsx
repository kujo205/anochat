"use client";

import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import { api } from "@/trpc/react";


import {PusherWebClient} from "@/app/pusher";


 function MessageList() {

    const users=api.user.getAllUsers.useQuery()


    const [messages, setMessages]=useState<Array<string>>([])

    useEffect(()=>{
        const channel=PusherWebClient.subscribe('test')
        channel.bind('test',(messageObj:{test:string})=> {
            setMessages(pr=>([...pr,messageObj.test]))
        })

        return ()=>PusherWebClient.unsubscribe('test')
    },[])



    return (<div>
        {messages.map((message,i)=>(<h3 key={i} color={'#fff'}>{message}</h3>))}
        <pre>
            {JSON.stringify(users.data,null,2)}
        </pre>


    </div>);

}

export default MessageList
