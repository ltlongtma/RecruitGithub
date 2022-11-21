import React from "react";
import styles from "./card.module.scss";

export const CardInfo = ({ number, content }) => {
  return (
    <div className={styles.container}>
      <div className={styles.number}>{number}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
