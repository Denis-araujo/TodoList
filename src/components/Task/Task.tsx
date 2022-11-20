import { Circle, Trash } from "phosphor-react";

import styles from "./Task.module.css";

export function Task() {
  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <Circle size={17} />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
          cupiditate laborum reiciendis harum commodi, explicabo, fugit eius
          magnam deleniti illum odio dolore pariatur amet at quia itaque, quos
          optio fugiat?
        </p>
      </div>

      <Trash />
    </div>
  );
}
