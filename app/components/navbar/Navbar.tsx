import React from 'react'
import Links from './Links'
import style from './navbar.module.css'
import Link from 'next/link'

function Navbar() {
  return (
    <div className={style.container}>
      <Link href='/' className={style.logo} >Logo</Link>
      <div>
        <Links />
      </div>
    </div>
  )
}


export default Navbar
