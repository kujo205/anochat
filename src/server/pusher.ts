import PusherServer from "pusher"

import { env } from "@/env.mjs";
export const pusherServerClient=new PusherServer({
    cluster: env.PUSHER_CLUSTER,
    key:env.PUSHER_KEY,
    secret:env.PUSHER_SECRET,
    appId:env.PUSHER_APP_ID
})

