'use client';
import Image from "next/image";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>
          Welcome home
        </h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ad ut officia! Voluptatum nulla accusantium aut,
          iure rem assumenda voluptatem sint sunt delectus, nostrum vitae et quibusdam corporis nobis minus!
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => { }}
          >Learn More</button>
          <button
            className={styles.button}
            onClick={() => { }}
          >Contact</button>
        </div>
        <div className={styles.brands}>
          <Image src='/brands.png' alt='' fill className={styles.brandImg} />
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src='/hero.gif'
          alt=''
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
}
