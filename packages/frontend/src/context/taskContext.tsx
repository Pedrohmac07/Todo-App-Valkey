import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from '../services/api';
import { type Task } from "../interfaces/taskInterface";

// 1. ADICIONEI O updateTask AQUI NA INTERFACE
interface TaskContextData {
  tasks: Task[];
  isLoading: boolean;
  addTask: (title: string, content?: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>; // <--- AQUI
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { data } = await api.get('/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (title: string, content: string = '') => {
    try {
      const { data } = await api.post('/tasks', {
        title,
        content: content || 'No description'
      });
      setTasks((oldState) => [...oldState, data]);
    } catch (error) {
      console.error('Context Error: Failed to add task', error);
      throw error;
    }
  };

  const removeTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((oldState) => oldState.filter(task => task.id !== id));
    } catch (error) {
      console.error("Context Error: Failed to remove task", error);
    }
  };

  // 2. CRIE A FUNÇÃO updateTask
  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      // Envia para o backend (PATCH)
      const { data } = await api.patch(`/tasks/${id}`, updates);

      // Atualiza a lista local trocando a task antiga pela nova
      setTasks((oldState) => oldState.map(task =>
        task.id === id ? data : task
      ));
    } catch (error) {
      console.error("Context Error: Failed to update task", error);
      throw error;
    }
  }

  // O toggleTask agora pode reutilizar o updateTask para ficar mais limpo
  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  return (
    // 3. NÃO ESQUEÇA DE EXPORTAR AQUI NO VALUE
    <TaskContext.Provider value={{
      tasks,
      isLoading,
      addTask,
      removeTask,
      toggleTask,
      updateTask // <--- AQUI
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
