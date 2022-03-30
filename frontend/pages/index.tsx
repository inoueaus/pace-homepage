import type { NextPage } from "next";
import Image from "next/image";
import ImageCard from "../components/UI/ImageCard";
import Card from "../components/UI/Card";

import styles from "../styles/Home.module.css";

import logo from "../public/images/original.jpg";
import mame from "../public/images/mame.jpg";
import coffee from "../public/images/coffee.jpg";
import art from "../public/images/art.jpg";
import nae from "../public/images/nae.jpg";
import flower from "../public/images/flower.jpg";
import plant from "../public/images/plant.jpg";
import Link from "next/link";

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
      <div className={styles["life-cycle"]}>
        <h1>コーヒーの木の成長過程</h1>
        <div className={styles["row-wrap"]}>
          <ImageCard image={nae} className="small">
            コーヒーはパーチメント付きのコーヒーの種子を発芽用のポットに植えます。種植えしてから約２ヶ月で発芽します。本葉が出てきたら植え替えをします。
          </ImageCard>
          <ImageCard image={flower} className="small">
            植付けから最初の開花まで、早いところでは18ヶ月、遅くても30ヶ月かかります。最初の花は、幼木なので、数も僅かです。
            開花は、一斉に起こるわけでなく、約4ヶ月の間に5〜7回に分けて開花します。
          </ImageCard>
          <ImageCard image={plant} className="small">
            コーヒーの苗は、1年ほどポットで栽培し、その後、路地植えをします。成木になるには、沖縄では、約3〜5年かかります。
          </ImageCard>
          <ImageCard image={mame} className="small">
            開花した花の約8割が結実します。結実すると花弁が落ち、小さな胡椒の実のような実が茎の先に見られるようになります。気象条件などで変わりますが、開花から約8ヶ月かけて徐々に大きくなり、完熟豆に成長します。
          </ImageCard>
        </div>
      </div>
      <div className={styles["inquiry"]}>
        <h1>お問い合わせ</h1>

        <Link href="/inquiry">
          <a style={{ color: "white", backgroundColor: "#372c2e" }}>
            お問い合せはこちら
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
