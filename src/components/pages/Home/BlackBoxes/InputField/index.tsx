"use client";
import World from "@/components/ui/icons/World";
import styles from "./styles.module.scss";
import Back from "@/components/ui/icons/Back";

interface Props {
  title: string;
}
const InputComponent = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type something..."
          className={styles.input}
        />
        <div className={styles.iconContainer}>
          <World />
          <Back />
        </div>
      </div>
    </div>
  );
};

export default InputComponent;
