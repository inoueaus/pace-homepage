import type { NextPage } from "next";
import Image from "next/image";
import ImageCard from "../components/UI/ImageCard";
import Card from "../components/UI/Card";
import InquiryFooter from "../components/index/InquiryFooter";
import LifeCycle from "../components/index/LifeCycle";

import styles from "../styles/Home.module.css";

import logo from "../public/images/original.jpg";
import mame from "../public/images/mame.jpg";
import coffee from "../public/images/coffee.jpg";
import art from "../public/images/art.jpg";

const Home: NextPage = () => {
  const coeText =
    "カップ・オブ・エクセレンス（英語：Cup of Excellence、略称：CoE）はコーヒーの品質審査制度。カップ・オブ・エクセレンスはコーヒー界のアカデミー賞（オスカー）とも例えられる。コーヒーの審査は少なくとも毎回5回行われ、最終的な勝者は「カップ・オブ・エクセレンス」を冠される。";

  return (
    <div className={styles.feed}>
      <Image src={logo} width="100%" height="100%" layout="responsive" />
      <div className={styles["main"]}>
        <h1>沖縄県産コーヒー農園、Pace</h1>
        <h3>コーヒーを通してすべての人に、平安を。</h3>
      </div>
      <ImageCard image={mame}>
        沖縄県のやんばるでコーヒーの栽培を行います。
      </ImageCard>
      <ImageCard image={coffee}>コーヒー豆の加工・販売を行います。</ImageCard>
      <ImageCard image={art}>障がい者の働く場を提供します。</ImageCard>
      <Card>
        <h1>我々の挑戦</h1>
        <h2>沖縄産コーヒーでCOE取得を目指す</h2>
        <span>{coeText}</span>
      </Card>
      <LifeCycle />
      <InquiryFooter />
    </div>
  );
};

export default Home;
