import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { AuthContext } from "../../context/auth-context";

const AppLayout: React.FC = props => {
  const router = useRouter();
  const context = useContext(AuthContext);

  const links = [
    { title: "ホーム", link: "/" },
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
      <nav>
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
    </>
  );
};

export default AppLayout;
