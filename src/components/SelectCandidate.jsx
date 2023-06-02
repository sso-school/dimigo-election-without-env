/* eslint-disable no-unused-vars */
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";

import styles from "@/styles/SelectCandidate.module.css";
import { selectedAtom } from "@/utils/states";

const SelectCandidate = ({ num, name, order, imageSrc }) => {
  const [selected, setSelected] = useRecoilState(selectedAtom);

  return (
    <div 
      className={styles.box} 
      style={{
        // order: order,
        opacity: selected === num || selected === 0 ? 1 : 0.3,
      }}
      onClick={() => {
        setSelected(selected === num ? 0 : num);
      }}
    >
      <Image src={`/poster/${imageSrc}`} width={210} height={280} alt={`기호 ${num}번 포스터`} />
      <div className={styles.info}>
        <div className={styles.num}>기호 {num}번</div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
};

export default SelectCandidate;