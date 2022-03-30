import type { NextPage } from "next";
import Image from "next/image";

import styles from "../styles/Home.module.css";

import logo from "../public/images/original.jpg";

const Home: NextPage = () => {
  return (
    <>
      <Image src={logo} width="100%" height="100%" layout="responsive" />
      <div className={styles["main"]}>
        <h1>沖縄県産コーヒー農園、Pace</h1>
        <h3>コーヒーを通してすべての人に、平安を。</h3>
      </div>
    </>
  );
};

export default Home;
