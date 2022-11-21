import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from "./Task.module.css";

interface TaskProps {
  id: number;
  value: string;
  isComplete: boolean;
  onDeleteTask: (taskToRemove: number) => void;
  onCheckedTask: (taskChecked: number) => void;
}

export function Task({
  value,
  id,
  onDeleteTask,
  onCheckedTask,
  isComplete,
}: TaskProps) {
  function handleRemoveTask(task: number) {
    onDeleteTask(task);
  }

  function handleCheckedTask(task: number) {
    onCheckedTask(task);
  }

  return (
    <div className={styles.container}>
      <div className={styles.task}>
        {isComplete ? (
          <CheckCircle size={23} onClick={() => handleCheckedTask(id)} />
        ) : (
          <Circle size={23} onClick={() => handleCheckedTask(id)} />
        )}
        <p className={isComplete ? styles.taskCompleted : ""}>{value}</p>
      </div>

      <Trash size={23} onClick={() => handleRemoveTask(id)} />
    </div>
  );
}
