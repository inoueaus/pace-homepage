import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const AppLayout: React.FC = props => {
  const router = useRouter();

  const links = [
    { title: "ホーム", link: "/" },
    { title: "法人説明", link: "/about" },
    { title: "ブログ", link: "/blog" },
    { title: "お問い合わせ", link: "/inquiry" },
  ];
  return (
    <>
    <Head>
      <title>沖縄コーヒー農園 Pace</title>
    </Head>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={`l${index}`}>
              <Link href={link.link}>
                <a>{link.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {props.children}
    </>
  );
};

export default AppLayout;
