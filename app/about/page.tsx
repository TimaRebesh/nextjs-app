import Image from 'next/image';
import React, { Component } from 'react';
import styles from './about.module.css';

import dynamic from 'next/dynamic';


function About() {
  return (
    <div className={styles.container}>

      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Us</h2>
        <h1 className={styles.title}>
          That is the information about us
        </h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat commodi et in, quidem accusamus aliquam repellat esse quam dolore expedita neque doloribus tempora dolorum veniam, eaque repellendus nesciunt rem pariatur.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src='/about.png'
          alt='about img'
          fill
          className={styles.img}
        />
      </div>


    </div>
  );
}

export default About;