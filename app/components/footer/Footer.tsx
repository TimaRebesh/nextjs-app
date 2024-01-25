import React from 'react';
import styles from './footer.module.css'

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </div>
    </div>
  )
}

export default Footer