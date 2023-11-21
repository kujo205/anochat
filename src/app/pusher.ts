import Pusher from "pusher-js";


const pusher_key = process.env.NEXT_PUBLIC_PUSHER_KEY!;
const pusher_custer=process.env.NEXT_PUBLIC_PUSHER_CLUSTER!;

export const PusherWebClient=new Pusher(pusher_key,{
    cluster:pusher_custer,
    enabledTransports:['ws']
})
