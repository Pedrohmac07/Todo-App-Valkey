import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from '../services/api';
import { type Task } from "../interfaces/taskInterface";
import { useAuth } from "./authContext";

interface TaskContextData {
  tasks: Task[];
  isLoading: boolean;
  addTask: (title: string, content?: string) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
}

const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get('/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks', error);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [user]);

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

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data } = await api.patch(`/tasks/${id}`, updates);
      setTasks((oldState) => oldState.map(task =>
        task.id === id ? data : task
      ));
    } catch (error) {
      console.error("Context Error: Failed to update task", error);
      throw error;
    }
  }

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      isLoading,
      addTask,
      removeTask,
      toggleTask,
      updateTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
