import React, { useState, useEffect } from 'react';
import { Users, UserPlus, BookOpen } from 'lucide-react';
import { createTarefa, createTreinamento, createTarefaFuncionario, getAllTarefas, getAllTreinamentos } from '../../lib/api';
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
  description?: string;
  dateCreated?: string;
  dueDate?: string;
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
      id: 8,
      name: 'Carolina Mendes',
      role: 'Banco de Dados',
      progress: 0,
      status: 'inactive'
    }
  ]);

  // Estados para gerenciar tarefas e treinamentos
  const [tasks, setTasks] = useState<TaskCategory[]>([]);

  const [trainingTasks, setTrainingTasks] = useState<TaskCategory[]>([]);

  // Estados para modais
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para carregar tarefas do backend
  const loadTasksFromBackend = async () => {
    try {
      console.log('🔄 Carregando tarefas do backend...');
      const tarefasData = await getAllTarefas();
      
      if (tarefasData && Array.isArray(tarefasData)) {
        // Converter dados do backend para o formato do frontend
        const formattedTasks: TaskCategory[] = tarefasData.map((tarefa: any) => ({
          id: tarefa.id,
          name: `Tarefa #${tarefa.id}`,
          completed: false, // Você pode ajustar isso baseado no status real
          assignee: tarefa.funcionario?.nome || 'Não atribuído',
          description: tarefa.descricao,
          dateCreated: new Date(tarefa.dataInicio).toLocaleDateString('pt-BR'),
          dueDate: new Date(tarefa.dataFim).toLocaleDateString('pt-BR')
        }));
        
        setTasks(formattedTasks);
        console.log('✅ Tarefas carregadas:', formattedTasks);
      } else {
        console.log('📝 Nenhuma tarefa encontrada');
        setTasks([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar tarefas:', error);
      // Manter array vazio em caso de erro
      setTasks([]);
    }
  };

  // Função para carregar treinamentos do backend
  const loadTrainingsFromBackend = async () => {
    try {
      console.log('🔄 Carregando treinamentos do backend...');
      const treinamentosData = await getAllTreinamentos();
      
      if (treinamentosData && Array.isArray(treinamentosData)) {
        // Converter dados do backend para o formato do frontend
        const formattedTrainings: TaskCategory[] = treinamentosData.map((treinamento: any) => ({
          id: treinamento.id,
          name: treinamento.funcionario?.nome || 'Não atribuído',
          completed: false, // Você pode ajustar isso baseado no status real
          assignee: treinamento.funcionario?.nome || 'Não atribuído',
          description: `${treinamento.nome} - ${treinamento.descricao}`,
          dateCreated: new Date(treinamento.dataCriacao).toLocaleDateString('pt-BR'),
          dueDate: new Date(treinamento.dataFim).toLocaleDateString('pt-BR')
        }));
        
        setTrainingTasks(formattedTrainings);
        console.log('✅ Treinamentos carregados:', formattedTrainings);
      } else {
        console.log('📝 Nenhum treinamento encontrado');
        setTrainingTasks([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar treinamentos:', error);
      // Manter array vazio em caso de erro
      setTrainingTasks([]);
    }
  };

  // useEffect para carregar dados do backend quando o componente montar
  useEffect(() => {
    console.log('🚀 Componente montado - carregando dados do backend');
    loadTasksFromBackend();
    loadTrainingsFromBackend();
  }, []);

  // Estados para formulários
  const [newTask, setNewTask] = useState<Tarefa>({
    descricao: '',
    dataFim: new Date().toISOString().split('T')[0],
    idFuncionario: 0
  });

  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  // Função para gerenciar seleção de funcionários
  const toggleEmployeeSelection = (employeeId: number) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const selectAllEmployees = () => {
    const activeEmployeeIds = teamMembers
      .filter(member => member.status === 'active')
      .map(member => member.id);
    setSelectedEmployees(activeEmployeeIds);
  };

  const clearEmployeeSelection = () => {
    setSelectedEmployees([]);
  };

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
    if (!newTask.descricao || selectedEmployees.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios e selecione pelo menos um funcionário!');
      return;
    }

    try {
      setLoading(true);
      console.log('=== INICIANDO CRIAÇÃO DE TAREFA ===');
      console.log('Dados da tarefa original:', newTask);
      console.log('Funcionários selecionados:', selectedEmployees);
      
      // Primeiro, criar a tarefa da forma tradicional (com o primeiro funcionário selecionado como responsável principal)
      const tarefaParaCriar = {
        ...newTask,
        idFuncionario: selectedEmployees[0] // Primeiro funcionário como responsável principal
      };
      
      console.log('Etapa 1: Criando tarefa principal...');
      console.log('Dados da tarefa a ser criada:', tarefaParaCriar);
      
      const response = await createTarefa(tarefaParaCriar);
      console.log('✅ Tarefa principal criada com sucesso:', response);
      
      // Verificar se obtivemos um ID válido
      const tarefaId = response?.id || response;
      if (!tarefaId) {
        throw new Error('ID da tarefa não foi retornado pelo servidor');
      }
      console.log('ID da tarefa obtido:', tarefaId);
      
      // Etapa 2: Criar os relacionamentos TarefaFuncionario para TODOS os funcionários selecionados
      console.log('Etapa 2: Criando relacionamentos TarefaFuncionario...');
      const associacoes = [];
      
      for (let i = 0; i < selectedEmployees.length; i++) {
        const funcionarioId = selectedEmployees[i];
        const tarefaFuncionario = {
          id_tarefa: tarefaId,
          id_funcionario: funcionarioId,
          status_tarefa: 0 // 0 = não iniciada, 1 = em progresso, 2 = concluída
        };
        
        console.log(`Criando relacionamento ${i + 1}/${selectedEmployees.length}:`, tarefaFuncionario);
        
        try {
          const associacao = await createTarefaFuncionario(tarefaFuncionario);
          console.log(`✅ Relacionamento ${i + 1} criado:`, associacao);
          associacoes.push(associacao);
        } catch (assocError: any) {
          console.error(`❌ Erro no relacionamento ${i + 1}:`, assocError);
          // Não falhar completamente se um relacionamento falhar
          console.warn(`Continuando apesar do erro no relacionamento com funcionário ${funcionarioId}`);
        }
      }
      
      console.log(`✅ ${associacoes.length}/${selectedEmployees.length} relacionamentos criados com sucesso`);
      
      // Recarregar a lista de tarefas do backend
      await loadTasksFromBackend();
      
      setShowTaskModal(false);
      setNewTask({ descricao: '', dataFim: new Date().toISOString().split('T')[0], idFuncionario: 0 });
      setSelectedEmployees([]);
      
      console.log('=== TAREFA E RELACIONAMENTOS CRIADOS COM SUCESSO ===');
      alert(`✅ Tarefa criada com sucesso!\n• Tarefa ID: ${tarefaId}\n• Atribuída a ${selectedEmployees.length} funcionário(s)\n• Relacionamentos criados: ${associacoes.length}/${selectedEmployees.length}`);
    } catch (error: any) {
      console.error('=== ERRO NA CRIAÇÃO DA TAREFA ===');
      console.error('Erro completo:', error);
      console.error('Stack trace:', error?.stack);
      
      let errorMessage = 'Erro ao criar tarefa: ';
      
      if (error.response) {
        // Erro da API
        console.error('Erro da API:', error.response);
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
        
        if (error.response.status === 500) {
          errorMessage += 'Erro interno do servidor. Verifique os logs do backend.';
        } else if (error.response.status === 404) {
          errorMessage += 'Endpoint não encontrado. Verifique se a API está rodando corretamente.';
        } else if (error.response.status === 400) {
          errorMessage += `Dados inválidos: ${error.response.data?.message || 'Verifique os dados enviados'}`;
        } else {
          errorMessage += `Erro HTTP ${error.response.status}: ${error.response.data?.message || error.message}`;
        }
      } else if (error.request) {
        // Erro de rede
        console.error('Erro de rede:', error.request);
        errorMessage += 'Erro de conexão. Verifique se o servidor está rodando na porta 8080.';
      } else {
        // Outro erro
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
      
      // Recarregar a lista de treinamentos do backend
      await loadTrainingsFromBackend();
      
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
          <div className="flex items-center justify-center">
            <div></div>
            <div>
              <h1 className="text-3xl font-bold text-purple-900 mb-2">ÁREA DO GESTOR</h1>
              <div className="flex items-center justify-center gap-2 text-gray-600 w-50px h-10">
                <Users/>
                <span>Equipe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Task Management */}
          <div className="lg:col-span-1">
            {/* Ler Formulário */}
            {tasks.map((task) => (
               <div key={task.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="bg-[#660099] text-white p-3 rounded-t-lg -m-6 mb-4">
                <h3 className="font-semibold">{task.description}</h3>
              </div>
              
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-800">
                        {member.name}
                      </span>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                ))}
              </div>
            </div>
            ))}

            

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Cards dinâmicos das tarefas criadas */}
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-6 text-center">{task.description}</h3>
                
                <div className="relative w-32 h-32 mx-auto mb-4">
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
                      strokeDasharray={`${task.completed ? 251.2 : 0} 251.2`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-700">
                        {task.completed ? '100%' : '0%'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    <span>Concluída</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span>Pendente</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Card para adicionar nova tarefa */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-6 border-2 border-dashed border-purple-300 flex items-center justify-center min-h-[200px]">
              <button
                onClick={() => setShowTaskModal(true)}
                className="flex flex-col items-center gap-3 text-purple-600 hover:text-purple-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <UserPlus size={24} />
                </div>
                <div className="text-center">
                  <div className="font-semibold">Criar Nova Tarefa</div>
                  <div className="text-sm text-purple-500">Clique para adicionar</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Nova Tarefa */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
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
                  Funcionários * (Selecione um ou mais)
                </label>
                
                {/* Botões de ação */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={selectAllEmployees}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Selecionar Todos
                  </button>
                  <button
                    type="button"
                    onClick={clearEmployeeSelection}
                    className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Limpar Seleção
                  </button>
                </div>

                {/* Lista de funcionários com checkboxes */}
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
                  {teamMembers.map((member) => (
                    <label key={member.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(member.id)}
                        onChange={() => toggleEmployeeSelection(member.id)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.role}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        member.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                    </label>
                  ))}
                </div>

                {/* Resumo da seleção */}
                {selectedEmployees.length > 0 && (
                  <div className="mt-2 p-2 bg-purple-50 rounded text-sm">
                    <strong>{selectedEmployees.length} funcionário(s) selecionado(s):</strong>
                    <div className="text-purple-700">
                      {selectedEmployees
                        .map(id => teamMembers.find(m => m.id === id)?.name)
                        .filter(Boolean)
                        .join(', ')}
                    </div>
                  </div>
                )}
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
