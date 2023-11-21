import Link from "next/link";
// import { useState } from "react";
import { CreatePost } from "@/app/_components/create-post";
import { api } from "@/trpc/server";
import styles from "./index.module.css";
import MessageList from "@/app/_components/MessageList";
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Create <span className={styles.pinkSpan}>T3</span> App
        </h1>
          <MessageList/>
        <CrudShowcase />
      </div>
    </main>
  );
}

 function CrudShowcase() {


  return (
    <div className={styles.showcaseContainer}>
      <CreatePost />
    </div>
  );
}
