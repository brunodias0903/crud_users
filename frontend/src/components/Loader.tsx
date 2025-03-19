import styles from "@styles/Loader.module.css";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loader;
