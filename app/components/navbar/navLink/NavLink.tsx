'use client'
import React from 'react';
import styles from './navLinks.module.css'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  item: LinkType
}

function NavLink({ item }: NavLinkProps) {

  const pathName = usePathname()

  return (
    <div className={`${styles.container} ${pathName === item.path && styles.active
      }`}>
      <Link href={item.path}>
        {item.title}
      </Link>
    </div>
  )
}

export default NavLink