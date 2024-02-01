'use client';
import styles from './navbar.module.css';
import React, { useState } from 'react';
import NavLink from './navLink/NavLink';
import Image from 'next/image';
import { handleLogOut } from '@lib/actions';
import { Session } from 'next-auth/types';

const links: LinkType[] = [
  {
    title: "Homepage",
    path: "/"
  },
  {
    title: "About",
    path: "/about"
  },
  {
    title: "Contact",
    path: "/contact"
  },
  {
    title: "Blog",
    path: "/blog"
  },
];

interface LinksProps {
  session: Session | null;
}


function Links({ session }: LinksProps) {

  const [isOpen, setIsOpen] = useState(false);

  const isAdmit = true;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map(link => (
          <NavLink key={link.title} item={link} />
        ))}
        {session?.user ? (
          <>
            {isAdmit && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleLogOut}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />

        )}
      </div>
      <Image
        src='/menu.png'
        alt=''
        width={30}
        height={30}
        onClick={() => setIsOpen(prev => !prev)}
        className={styles.menuButton}
      />
      {isOpen && (
        <div className={styles.mobileLinks}>
          {links.map(link => (
            <NavLink key={link.title} item={link} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Links;