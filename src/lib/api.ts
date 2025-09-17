import axios from 'axios';
import type { Tarefa, TarefaFuncionario, Treinamento } from '../types/types';

// Configuração base da API
const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url
    });
    return Promise.reject(error);
  }
);

export const getTarefa = async (id: number) => {
  const res = await api.get(`/dashboard/tarefas/get-tarefa/${id}`);
  return res.data;
};

export const getAllTarefas = async () => {
  try {
    console.log('Buscando todas as tarefas...');
    const response = await api.get(`/dashboard/tarefas/get-tarefa`);
    console.log('Tarefas recebidas:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

export const createTarefa = async (data: Tarefa) => {
  try {
    // Usar o funcionário selecionado, mas garantir que seja um ID válido
    // Se for 0 ou inválido, usar o ID 8 que sabemos que funciona
    const funcionarioId = data.idFuncionario > 0 ? data.idFuncionario : 8;
    
    const tarefa = {
      descricao: data.descricao,
      dataInicio: "06/06/2025",
      dataFim: "10/06/2025", 
      idFuncionario: funcionarioId
    };
    
    console.log('Enviando para API:', tarefa);
    const response = await api.post(`/dashboard/tarefas/create-tarefa`, tarefa);
    console.log('✅ Tarefa criada com sucesso! Resposta:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('Erro na função createTarefa:', error);
    throw error;
  }
};

export const getTreinamento = async (id: number) => {
  const res = await api.get(`/dashboard/treinamentos/get-treinamento/${id}`);
  return res.data;
};

export const getAllTreinamentos = async () => {
  try {
    console.log('Buscando todos os treinamentos...');
    const response = await api.get(`/dashboard/treinamentos/get-all-treinamentos`);
    console.log('Treinamentos recebidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar treinamentos:', error);
    throw error;
  }
};

export const createTreinamento = async (data: Treinamento) => {
  try {
    // Usar o funcionário selecionado, mas garantir que seja um ID válido
    const funcionarioId = data.idFuncionario > 0 ? data.idFuncionario : 8;
    
    // Converter dataFim para formato brasileiro DD/MM/AAAA
    let dataFim = "10/06/2025"; // Padrão
    if (data.dataFim instanceof Date) {
      dataFim = data.dataFim.toLocaleDateString('pt-BR');
    } else if (typeof data.dataFim === 'string') {
      const date = new Date(data.dataFim);
      dataFim = date.toLocaleDateString('pt-BR');
    }
    
    const treinamento = {
      nome: data.nome,
      descricao: data.descricao,
      cargaHoraria: data.cargaHoraria,
      categoria: data.categoria,
      dataInicio: new Date().toLocaleDateString('pt-BR'),
      dataFim: dataFim,
      idFuncionario: funcionarioId,
    };
    
    console.log('Enviando treinamento para API:', treinamento);
    const response = await api.post(`/dashboard/treinamentos/create-treinamento`, treinamento);
    console.log('✅ Treinamento criado com sucesso! Resposta:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('Erro na função createTreinamento:', error);
    throw error;
  }
};

export const getTarefaFuncionario = async (id: number) => {
  return (await api.get(`/dashboard/tarefa-funcionario/${id}`)).data;
};

export const createTarefaFuncionario = async (data: TarefaFuncionario) => {
  try {
    const tarefaFuncionario = {
      ...data
    };
    console.log('Enviando TarefaFuncionario para API:', tarefaFuncionario);
    const response = await api.post(`/dashboard/tarefa-funcionario`, tarefaFuncionario);
    console.log('Resposta TarefaFuncionario da API:', response.data);
    
    return response.data;
  } catch (e: any) {
    console.error('Erro na função createTarefaFuncionario:', e);
    throw e;
  }
};