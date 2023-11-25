import Link from 'next/link'
import { CreatePost } from '@/components/create-post'
import { api } from '@/trpc/server'
import styles from './index.module.css'
import MessageList from '@/components/MessageList'
import { Card } from '@/components/ui/card'

export default function Home() {
    return (
        <div className="flex flex-col h-[100%] flex-1">
            <MessageList />
            <CreatePost />
        </div>
    )
}
