import { Header } from "./components/Header/Header";
import { ClipboardText, PlusCircle } from "phosphor-react";

import styles from "./App.module.css";
import { Task } from "./components/Task/Task";
import { FormEvent, useState } from "react";

export interface listTaskProps {
  id: number;
  value: string;
  isComplete: boolean;
}

export function App() {
  const [listTask, setListTask] = useState<Array<listTaskProps>>([]);

  const [newTask, setNewTask] = useState("");

  function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const task = {
      id: Math.random(),
      isComplete: false,
      value: newTask,
    };

    setListTask([...listTask, task]);
    setNewTask("");
  }

  function removeTask(taskToRemove: number) {
    const newListTask = listTask.filter((item) => item.id !== taskToRemove);

    setListTask(newListTask);
  }

  function checkedTask(taskchecked: number) {
    const taskchecked2 = listTask.findIndex((task) => task.id === taskchecked);

    const newListTasks = listTask.map((task, indice) => {
      if (indice === taskchecked2) {
        const isComplete = task.isComplete;

        return {
          ...task,
          isComplete: !isComplete,
        };
      }

      return task;
    });

    setListTask(newListTasks);
  }

  function tasksCompleted() {
    const taskscompleted2 = listTask.reduce(
      (accumulator, currentValue) => {
        if (currentValue.isComplete === true) {
          accumulator.total++;
        } else {
          accumulator.total;
        }

        return accumulator;
      },
      {
        total: 0,
      }
    );

    return taskscompleted2.total;
  }

  const isListTaskEmpty = listTask.length === 0;
  const isNewTaskEmpty = newTask.length === 0;

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.containerContent}>
        <header className={styles.headerForm}>
          <form onSubmit={handleCreateNewTask}>
            <input
              type="text"
              placeholder="Adicione uma tarefa"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" disabled={isNewTaskEmpty}>
              Criar
              <PlusCircle size={16} />
            </button>
          </form>
        </header>

        <div className={styles.content}>
          <header>
            <span>
              Tarefas criadas{" "}
              <span className={styles.counter}>{listTask.length}</span>
            </span>
            <span>
              Concluidas{" "}
              <span className={styles.counter}>
                {isListTaskEmpty
                  ? "0"
                  : `${tasksCompleted()} de ${listTask.length}`}
              </span>
            </span>
          </header>

          {isListTaskEmpty ? (
            <div className={styles.emptyTaskList}>
              <ClipboardText size={56} />

              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          ) : (
            <div className={styles.todoList}>
              {listTask.map((task) => {
                return (
                  <Task
                    key={task.value}
                    id={task.id}
                    value={task.value}
                    isComplete={task.isComplete}
                    onDeleteTask={removeTask}
                    onCheckedTask={checkedTask}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
