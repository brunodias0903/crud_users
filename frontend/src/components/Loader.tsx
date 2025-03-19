import styles from "@styles/Loader.module.css";
import React from "react";

interface LoaderProps {
  customStyle?: React.CSSProperties;
}

const Loader: React.FC<LoaderProps> = ({ customStyle }) => {
  return <div className={styles.spinner} style={{ ...customStyle }} />;
};

export default Loader;
