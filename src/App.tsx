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
  const [listTasks, setListTasks] = useState<listTaskProps[]>([]);

  const [newTask, setNewTask] = useState("");

  function handleCreateNewTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const task = {
      id: Math.random(),
      isComplete: false,
      value: newTask,
    };

    setListTasks([...listTasks, task]);
    setNewTask("");
  }

  function removeTask(taskToRemove: number) {
    const newListTask = listTasks.filter((item) => item.id !== taskToRemove);

    setListTasks(newListTask);
  }

  function checkedTask(taskChecked: number) {
    const newListTasks = listTasks.map((task) => {
      if (task.id === taskChecked) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      }

      return task;
    });

    setListTasks(newListTasks);
  }

  function tasksCompleted() {
    const tasksCompleted = listTasks.reduce(
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

    return tasksCompleted.total;
  }

  const isListTaskEmpty = listTasks.length === 0;
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
              <span className={styles.counter}>{listTasks.length}</span>
            </span>
            <span>
              Concluidas{" "}
              <span className={styles.counter}>
                {isListTaskEmpty
                  ? "0"
                  : `${tasksCompleted()} de ${listTasks.length}`}
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
              {listTasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    value={task.value}
                    isComplete={task.isComplete}
                    onDeleteTask={removeTask}
                    onCheckedTask={() => {
                      checkedTask(task.id)
                    }}
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
