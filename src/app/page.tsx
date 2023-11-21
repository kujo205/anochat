import Link from 'next/link'
import { CreatePost } from '@/components/create-post'
import { api } from '@/trpc/server'
import styles from './index.module.css'
import MessageList from '@/components/MessageList'
export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Try <span className={styles.pinkSpan}>Ano Chat</span>
                </h1>
                <MessageList />
                <CrudShowcase />
            </div>
        </main>
    )
}

function CrudShowcase() {
    return (
        <div className={styles.showcaseContainer}>
            <CreatePost />
        </div>
    )
}
