import Head from "next/head";
import React from "react";

const DefaultHead = () => {
  return (
    <Head>
      <title>제 22대 학생자치회 정/부회장 선거 시스템</title>
      <meta name="description" content="한국디지털미디어고등학교 제 22대 학생자치회 정/부회장 선거 시스템" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:image" content="https://bucket.2w.vc/public/vote.png" />
      <link rel="icon" href="/favicon.ico" />
      <script defer data-domain="dimigo.net" src="https://analytics.2w.vc/js/script.js"></script>
    </Head>
  );
};

export default DefaultHead;