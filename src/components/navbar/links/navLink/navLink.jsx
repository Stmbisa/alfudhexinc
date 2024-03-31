"use client";

import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname(); // comes from nextjs

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathName === item.path && styles.active // check the active path and change the background
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
