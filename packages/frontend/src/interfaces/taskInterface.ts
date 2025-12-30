export interface Task {
 id: string;
 title: string;
 content: string;
 completed: boolean;
 createdAt: string;
 userId: string;
}

export interface taskContextType {
 tasks: Task[];
 isLoading: boolean;
 addTask: (title: string, content?: string) => Promise<void>;
 removeTask: (id: string) => Promise<void>;
 toggleTask: (id: string) => Promise<void>;
}

