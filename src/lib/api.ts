import axios from 'axios';
import type { Tarefa, Treinamento } from '../types/types';

// Função para detectar a melhor URL da API
const getApiBaseURL = () => {
  // Em desenvolvimento, tenta primeiro o proxy, depois direto
  if (import.meta.env.DEV) {
    return '/api';
  }
  // Em produção, usa a variável de ambiente ou fallback
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
};

// Configuração base da API
const api = axios.create({
  baseURL: getApiBaseURL(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
})

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.config.url, response.data);
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
    
    // Tratar diferentes tipos de erro
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      error.userMessage = 'Não foi possível conectar ao servidor. Verifique se ele está rodando na porta 8080.';
    } else if (error.response?.status === 404) {
      error.userMessage = 'Endpoint não encontrado.';
    } else if (error.response?.status === 500) {
      error.userMessage = 'Erro interno do servidor.';
    } else if (error.response?.status === 0) {
      error.userMessage = 'Erro de CORS ou servidor não responde.';
    } else {
      error.userMessage = error.response?.data?.message || error.message || 'Erro desconhecido.';
    }
    
    return Promise.reject(error);
  }
);

// Função de teste para verificar conectividade
export const testConnection = async () => {
    try {
        console.log('🔍 Testando conexão com:', getApiBaseURL());
        const response = await api.get('/dashboard/tarefas/get-tarefa/21');
        console.log('✅ Conexão OK:', response.data);
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error('❌ Erro de conexão:', error);
        
        // Se falhar com proxy, tenta direto
        if (getApiBaseURL() === '/api') {
            try {
                console.log('🔄 Tentando conexão direta...');
                const directApi = axios.create({
                    baseURL: 'http://localhost:8080',
                    timeout: 15000,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                const response = await directApi.get('/dashboard/tarefas/get-tarefa/21');
                console.log('✅ Conexão direta OK:', response.data);
                return { 
                    success: true, 
                    data: response.data, 
                    message: 'Conexão direta funcionou - CORS pode estar causando problemas' 
                };
            } catch (directError: any) {
                console.error('❌ Conexão direta também falhou:', directError);
                return { 
                    success: false, 
                    error: 'Tanto proxy quanto conexão direta falharam. Verifique se o servidor está rodando.' 
                };
            }
        }
        
        return { success: false, error: error.userMessage || error.message };
    }
};

export const getTarefa = async (id : number) => {
    const res = await api.get(`/dashboard/tarefas/get-tarefa/${id}`)

    return res.data
}

export const createTarefa = async (data: Tarefa) => {
    try {
        const tarefa = {
            descricao: data.descricao,
            dataInicio: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
            dataFim: typeof data.dataFim === 'string' ? data.dataFim : data.dataFim.toISOString().split('T')[0],
            idFuncionario: data.idFuncionario
        };
        
        console.log('Enviando para API:', tarefa);
        const response = await api.post(`/dashboard/tarefas/create-tarefa`, tarefa);
        console.log('Resposta da API:', response.data);
        
        return response.data;
    } catch (error: any) {
        console.error('Erro na função createTarefa:', error);
        throw error;
    }
}

export const getTreinamento = async (id : number) => {
    const res = await api.get(`/dashboard/treinamentos/get-treinamento/${id}`)
    return res.data
}


export const createTreinamento = async (data : Treinamento) => {
    try {
        const treinamento = {
            ...data,
            dataCriacao: new Date().toISOString(),
        };
        
        console.log('Enviando treinamento para API:', treinamento);
        const response = await api.post(`/dashboard/treinamentos/create-treinamento`, treinamento);
        console.log('Resposta da API:', response.data);
        
        return response.data;
    } catch (error: any) {
        console.error('Erro na função createTreinamento:', error);
        throw error;
    }
}
