import axios from 'axios';
import type { Tarefa } from '../types/types';

// Configuração base da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getTarefa = async (id : number) => {
    const res = await api.get(`/dashboard/tarefas/get-tarefa/${id}`)

    return res.data
}

export const createTarefa = async (data : Tarefa) => {
    const tarefa = {
    ...data,
    dataCriacao : new Date().toISOString,
  };
    await api.post(`/dashboard/tarefas/create-tarefa`, tarefa)
}

export const getTreinamento = async (id : number) => {
    const res = await api.get(`/dashboard/treinamentos/get-treinamento/${id}`)
    return res.data
}


export const createTreinamento = async (data : Tarefa) => {
    const tarefa = {
    ...data,
    dataCriacao : new Date().toISOString,
  };
    await api.post(`/dashboard/tarefas/create-treinamento`, tarefa)
}
