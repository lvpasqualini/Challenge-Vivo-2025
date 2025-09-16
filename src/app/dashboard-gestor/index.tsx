import React, { useState } from 'react';
import { Users, UserPlus, CheckCircle, BookOpen, Wifi } from 'lucide-react';
import { createTarefa, createTreinamento, testConnection } from '../../lib/api';
import type { Tarefa, Treinamento } from '../../types/types';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  progress: number;
  status: 'active' | 'inactive';
}

interface TaskCategory {
  id: number;
  name: string;
  completed: boolean;
  assignee?: string;
}

const DashboardGestor: React.FC = () => {
  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 63,
      name: 'Marcos Antônio',
      role: 'QA',
      progress: 80,
      status: 'active'
    },
    {
      id: 64,
      name: 'Fábio Júnior',
      role: 'Engenheiro de Software',
      progress: 30,
      status: 'active'
    },
    {
      id: 62,
      name: 'Ana Maria',
      role: 'QA',
      progress: 60,
      status: 'active'
    },
    {
      id: 65,
      name: 'Carolina Mendes',
      role: 'Banco de Dados',
      progress: 0,
      status: 'inactive'
    }
  ]);

  // Estados para gerenciar tarefas e treinamentos
  const [tasks, setTasks] = useState<TaskCategory[]>([
    { id: 1, name: 'Ana Maria', completed: true, assignee: 'Ana Maria' },
    { id: 2, name: 'Nicoli Silva', completed: true, assignee: 'Nicoli Silva' },
    { id: 3, name: 'Marcos Antonio', completed: true, assignee: 'Marcos Antônio'  },
    { id: 4, name: 'Fábio Júnior', completed: false, assignee: 'Fábio Júnior' },
    { id: 5, name: 'Carolina Mendes', completed: false, assignee: 'Carolina Mendes' }
  ]);

  const [trainingTasks, setTrainingTasks] = useState<TaskCategory[]>([
    { id: 1, name: 'Ana Maria', completed: true },
    { id: 2, name: 'Nicoli Silva', completed: true },
    { id: 3, name: 'Marcos Antônio', completed: true },
    { id: 4, name: 'Fábio Júnior', completed: true }
  ]);

  // Estados para modais
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estados para formulários
  const [newTask, setNewTask] = useState<Tarefa>({
    descricao: '',
    dataFim: new Date().toISOString().split('T')[0],
    idFuncionario: 0
  });

  const [newTraining, setNewTraining] = useState<Treinamento>({
    nome: '',
    descricao: '',
    cargaHoraria: 0,
    categoria: '',
    dataFim: new Date(),
    idFuncionario: 0
  });

  // Função para criar nova tarefa
  const handleCreateTask = async () => {
    if (!newTask.descricao || !newTask.idFuncionario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      console.log('Enviando tarefa:', newTask);
      
      const response = await createTarefa(newTask);
      console.log('Resposta da API:', response);
      
      // Adicionar à lista local
      const newTaskItem: TaskCategory = {
        id: tasks.length + 1,
        name: teamMembers.find(m => m.id === newTask.idFuncionario)?.name || 'Funcionário',
        completed: false,
        assignee: teamMembers.find(m => m.id === newTask.idFuncionario)?.name
      };
      
      setTasks([...tasks, newTaskItem]);
      setShowTaskModal(false);
      setNewTask({ descricao: '', dataFim: new Date().toISOString().split('T')[0], idFuncionario: 0 });
      alert('Tarefa criada com sucesso!');
    } catch (error: any) {
      console.error('Erro completo:', error);
      
      let errorMessage = 'Erro ao criar tarefa: ';
      
      if (error.userMessage) {
        errorMessage += error.userMessage;
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage += 'Erro de rede. Verifique sua conexão e se o servidor está rodando.';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage += 'Servidor não está respondendo. Verifique se está rodando na porta 8080.';
      } else {
        errorMessage += error?.message || 'Erro desconhecido.';
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Função para criar novo treinamento
  const handleCreateTraining = async () => {
    if (!newTraining.nome || !newTraining.descricao || !newTraining.idFuncionario) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    try {
      setLoading(true);
      await createTreinamento(newTraining);
      
      // Adicionar à lista local
      const newTrainingItem: TaskCategory = {
        id: trainingTasks.length + 1,
        name: teamMembers.find(m => m.id === newTraining.idFuncionario)?.name || 'Funcionário',
        completed: false
      };
      
      setTrainingTasks([...trainingTasks, newTrainingItem]);
      setShowTrainingModal(false);
      setNewTraining({ 
        nome: '', 
        descricao: '', 
        cargaHoraria: 0, 
        categoria: '', 
        dataFim: new Date(), 
        idFuncionario: 0 
      });
      alert('Treinamento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar treinamento:', error);
      alert('Erro ao criar treinamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completedTraining = trainingTasks.filter(task => task.completed).length;
  const totalTraining = trainingTasks.length;

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return 'bg-green-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-400' : 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">ÁREA DO GESTOR</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 w-50px h-10">
            <Users/>
            <span>Equipe</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Task Management */}
          <div className="lg:col-span-1">
            {/* Ler Formulário */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="bg-[#660099] text-white p-3 rounded-t-lg -m-6 mb-4">
                <h3 className="font-semibold">Ler Formulário</h3>
              </div>
              
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${task.completed ? 'bg-purple-800' : 'bg-gray-300'}`}>
                        {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-sm ${task.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                        {task.name}
                      </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${task.completed ? 'bg-purple-800' : 'bg-gray-300'}`}></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Challenge Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="bg-[#660099] text-white p-3 rounded-t-lg -m-6 mb-4">
                <h3 className="font-semibold">Concluir Desafio</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm">Ana Maria</span>
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm">Nicoli Silva</span>
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm">Marcos Antônio</span>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex items-center justify-between p-2">
                  <span className="text-sm">Fábio Júnior</span>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Assistir Treinamento */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="bg-[#660099] text-white p-3 rounded-t-lg -m-6 mb-4">
                <h3 className="font-semibold">Assistir treinamento</h3>
              </div>
              
              <div className="space-y-3">
                {trainingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2">
                    <span className="text-sm">{task.name}</span>
                    <div className={`w-3 h-3 rounded-full ${task.completed ? 'bg-purple-800' : 'bg-gray-300'}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Task Button */}
            <div className="space-y-3">
              <button 
                onClick={() => setShowTaskModal(true)}
                className="w-full bg-[#660099] text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Nova tarefa
              </button>
              
              <button 
                onClick={() => setShowTrainingModal(true)}
                className="w-full bg-[#660099] text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Novo treinamento
              </button>
            </div>
          </div>


          {/* Right Panel - Team Members */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-gray-500" />
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{member.role}</p>
                    
                    <div className="w-full mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Progresso</span>
                        <span className="text-sm font-semibold">{member.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(member.progress)}`}
                          style={{ width: `${member.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Relatório */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Relatório Geral:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Formulário */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6 text-center">Ler formulário:</h3>
              
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#660099"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${(completedTasks / totalTasks) * 251.2} 251.2`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">
                      {Math.round((completedTasks / totalTasks) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                  <span>Concluídos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span>Não concluídos</span>
                </div>
              </div>
            </div>

            {/* Assistir Treinamento */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-6 text-center">Assistir treinamento:</h3>
              
              <div className="relative w-48 h-48 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#660099"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${(completedTraining / totalTraining) * 251.2} 251.2`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-700">
                      {Math.round((completedTraining / totalTraining) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                  <span>Concluídos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span>Não concluídos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Nova Tarefa */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 text-purple-900">Nova Tarefa</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição da Tarefa *
                </label>
                <textarea
                  value={newTask.descricao}
                  onChange={(e) => setNewTask({...newTask, descricao: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descreva a tarefa..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funcionário *
                </label>
                <select
                  value={newTask.idFuncionario}
                  onChange={(e) => setNewTask({...newTask, idFuncionario: Number(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={0}>Selecione um funcionário</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Conclusão *
                </label>
                <input
                  type="date"
                  value={typeof newTask.dataFim === 'string' ? newTask.dataFim : newTask.dataFim.toISOString().split('T')[0]}
                  onChange={(e) => setNewTask({...newTask, dataFim: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTaskModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTask}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Criando...' : 'Criar Tarefa'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Novo Treinamento */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-purple-900">Novo Treinamento</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Treinamento *
                </label>
                <input
                  type="text"
                  value={newTraining.nome}
                  onChange={(e) => setNewTraining({...newTraining, nome: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Treinamento de Segurança"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição *
                </label>
                <textarea
                  value={newTraining.descricao}
                  onChange={(e) => setNewTraining({...newTraining, descricao: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Descreva o treinamento..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Carga Horária (horas)
                </label>
                <input
                  type="number"
                  value={newTraining.cargaHoraria}
                  onChange={(e) => setNewTraining({...newTraining, cargaHoraria: Number(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: 8"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={newTraining.categoria}
                  onChange={(e) => setNewTraining({...newTraining, categoria: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Segurança">Segurança</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Produto">Produto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funcionário *
                </label>
                <select
                  value={newTraining.idFuncionario}
                  onChange={(e) => setNewTraining({...newTraining, idFuncionario: Number(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={0}>Selecione um funcionário</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data de Conclusão *
                </label>
                <input
                  type="date"
                  value={newTraining.dataFim.toISOString().split('T')[0]}
                  onChange={(e) => setNewTraining({...newTraining, dataFim: new Date(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTrainingModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateTraining}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Criando...' : 'Criar Treinamento'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardGestor;
