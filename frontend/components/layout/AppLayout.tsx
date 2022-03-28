import React from "react";
import Link from "next/link";

const AppLayout: React.FC = props => {
  const links = [{ title: "法人説明", link: "/about" }, { title: "ブログ", link: "/blog"  }, { title: "お問い合わせ", link: "/inquiry"  }];
  return (
    <>
      <nav>
        <ul>
          {links.map(link => (
            <li>
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
