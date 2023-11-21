'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/trpc/react'
import styles from '../app/index.module.css'

export function CreatePost() {
    const sendTestMessage = api.user.sendTestPusherMessage.useMutation()

    const [testString, setTestString] = useState('')

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                console.log('2 times')
                sendTestMessage.mutate({ test: testString })
            }}
            className={styles.form}
        >
            <input
                type="text"
                placeholder="Title"
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className={styles.input}
            />
            <Button
                // variant={'default'}
                type="submit"
                // className="bg-blue-700"
                // disabled={sendTestMessage.isLoading}
            >
                {sendTestMessage.isLoading ? 'Submitting...' : 'Submit'}
            </Button>
        </form>
    )
}
