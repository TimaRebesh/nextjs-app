import React from 'react';
import Links from './Links';
import style from './navbar.module.css';
import Link from 'next/link';
import { auth } from '@lib/auth';

async function Navbar() {

  const session = await auth();

  return (
    <div className={style.container}>
      <Link href='/' className={style.logo} >Logo</Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
}


export default Navbar;
