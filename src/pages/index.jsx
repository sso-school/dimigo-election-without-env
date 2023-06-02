/* eslint-disable no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRecoilState } from "recoil";

import DefaultHead from "@/components/DefaultHead";
import SelectCandidate from "@/components/SelectCandidate";
import styles from "@/styles/Home.module.css";
import * as env from "@/utils/env";
import { selectedAtom } from "@/utils/states";

const orderRand = () => Math.floor(Math.random() * 4);
const candidates = [
  {
    num: 1,
    order: orderRand(),
    name: "이무원/이주안",
    imageSrc: "1.webp"
  },
  {
    num: 2,
    order: orderRand(),
    name: "주현준/서영원",
    imageSrc: "2.webp"
  },
  {
    num: 3,
    order: orderRand(),
    name: "박재현/황석준",
    imageSrc: "3.webp"
  },
  {
    num: 4,
    order: orderRand(),
    name: "김동근/정시현",
    imageSrc: "4.webp"
  }
];

export default function Home() {
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [loading, setLoading] = useState(false);

  const vote = () => {
    if(selected === 0) return;
    setLoading(true);
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${env.KAKAO_REST_KEY}&redirect_uri=${env.KAKAO_REDIRECT_URI}?selected=${selected}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <>
      <DefaultHead />
      <main className={styles.main}>
        <div className={`${styles.loading} ${loading && styles.show}`}>
          <div className={styles["lds-ring"]}><div></div><div></div><div></div><div></div></div>
        </div>
        <div className={styles.title}>
          <img src="/favicon.ico" alt="logo" className={styles.titleImg} />
          제 22대 학생자치회 정/부회장 투표
        </div>
        <div className={styles.selects}>
          {
            candidates.map((candidate) => (
              <SelectCandidate order={Math.floor(Math.random() * 4)} key={candidate.num} {...candidate} />
            ))
          }
        </div>
        
        <div 
          className={styles.button} 
          style={{
            opacity: selected === 0 ? 0.3 : 1,
          }}
          onClick={vote}
        >
          {selected !== 0 && (
            <div className={styles.buttonText}>
              {candidates[selected - 1].num}번 {candidates[selected - 1].name}
            </div>
          )}투표하기
        </div>
      </main>
    </>
  );
}
