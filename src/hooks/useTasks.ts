import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export type TaskStatus = 'pending' | 'inplay' | 'completed' | 'cancelled' | 'failed';
export type TaskSquad = 'spectre' | 'subsquad' | 'both';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigned_to: TaskSquad;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();

    const channel = supabase
      .channel('tasks')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchTasks() {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setTasks(data as Task[]);
    setLoading(false);
  }

  async function createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    await supabase.from('tasks').insert([task]);
  }

  async function updateTaskStatus(id: string, status: TaskStatus) {
    await supabase.from('tasks').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  }

  async function deleteTask(id: string) {
    await supabase.from('tasks').delete().eq('id', id);
  }

  return { tasks, loading, createTask, updateTaskStatus, deleteTask };
}
