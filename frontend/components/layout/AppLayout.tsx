import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { AuthContext } from "../../context/auth-context";

import styles from "./AppLayout.module.css";

const AppLayout: React.FC = props => {
  const router = useRouter();
  const context = useContext(AuthContext);

  const links = [
    { title: "法人説明", link: "/about" },
    { title: "ブログ", link: "/blog" },
    { title: "お問い合わせ", link: "/inquiry" },
  ];

  const handleLogoutClick = () => context.logoutUser();

  return (
    <>
      <Head>
        <title>沖縄コーヒー農園 Pace</title>
      </Head>
      <nav className={styles.navbar}>
        <Link href="/">
          <section>Pace</section>
        </Link>
        <ul>
          {links.map((link, index) => (
            <li key={`l${index}`}>
              <Link href={link.link}>
                <a>{link.title}</a>
              </Link>
            </li>
          ))}
          {context.isAuth && (
            <li>
              <a onClick={handleLogoutClick}>ログアウト</a>
            </li>
          )}
        </ul>
      </nav>
      {props.children}
      <footer className={styles.footer}>
        <div>Copyright 2022 Pace農園</div>
        <small>沖縄県那覇市首里石嶺町</small>
      </footer>
    </>
  );
};

export default AppLayout;
