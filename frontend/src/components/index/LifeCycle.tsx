import Link from "next/link";
import React from "react";
import ImageCard from "../UI/ImageCard";

import styles from "./LifeCycle.module.css";

import nae from "../../public/images/nae.jpg";
import flower from "../../public/images/flower.jpg";
import plant from "../../public/images/plant.jpg";
import mame from "../../public/images/mame.jpg";

const LifeCycle: React.FC = () => {
  return (
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
  );
};

export default LifeCycle;
