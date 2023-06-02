/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";

import DefaultHead from "@/components/DefaultHead";
import styles from "@/styles/Message.module.css";

const Message = () => {
  const router = useRouter();
  const { m: message } = router.query;
  return (
    <>
      <DefaultHead />
      <main className={styles.main}>
        <div className={styles.title}>
          <img src="/favicon.ico" alt="logo" className={styles.titleImg} />
          제 22대 학생자치회 정/부회장 투표
        </div>
        <div className={styles.box}>
          <div className={styles.message}>{message !== undefined &&decodeURIComponent(message)}</div>
        </div>
      </main>
    </>
  );
};

export default Message;