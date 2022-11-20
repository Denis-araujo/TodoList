import { Header } from "./components/Header/Header";
import { ClipboardText, PlusCircle } from "phosphor-react";

import styles from "./App.module.css";

export function App() {
  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.containerContent}>
        <header className={styles.headerForm}>
          <form>
            <input type="text" placeholder="Adicione uma tarefa" />
            <button>
              Criar
              <PlusCircle size={16} />
            </button>
          </form>
        </header>

        <div className={styles.content}>
          <header>
            <span>
              Tarefas criadas <span className={styles.counter}>0</span>
            </span>
            <span>
              Concluidas <span className={styles.counter}>0</span>
            </span>
          </header>

          <div className={styles.todoList}>
            <ClipboardText size={56} />

            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      </div>
    </main>
  );
}
