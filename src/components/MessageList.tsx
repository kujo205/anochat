'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/trpc/react'

import { PusherWebClient } from '@/app/pusher'

function MessageList() {
    const [messages, setMessages] = useState<Array<string>>([])

    useEffect(() => {
        const channel = PusherWebClient.subscribe('test')
        channel.bind('test', (messageObj: { test: string }) => {
            setMessages((pr) => [...pr, messageObj.test])
        })

        return () => PusherWebClient.unsubscribe('test')
    }, [])

    return (
        <div className="text-white text-lg flex flex-col items-center">
            {messages.map((message, i) => (
                <h3 key={i} color={'#fff'}>
                    {message}
                </h3>
            ))}
        </div>
    )
}

export default MessageList
