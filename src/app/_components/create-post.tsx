"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";
import styles from "../index.module.css";

export function CreatePost() {


  const sendTestMessage=api.user.sendTestPusherMessage.useMutation()

  const [testString, setTestString] = useState("");


  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('2 times')
        sendTestMessage.mutate({ test:testString });
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
      <button
        type="submit"
        className={styles.submitButton}
        disabled={sendTestMessage.isLoading}
      >
        {sendTestMessage.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
