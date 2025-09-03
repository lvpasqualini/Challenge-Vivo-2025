import React, { useState } from 'react';
import { Users, UserPlus, Activity, CheckCircle } from 'lucide-react';

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
      id: 1,
      name: 'Marcos Antônio',
      role: 'QA',
      progress: 80,
      status: 'active'
    },
    {
      id: 2,
      name: 'Fábio Júnior',
      role: 'Engenheiro de Software',
      progress: 30,
      status: 'active'
    },
    {
      id: 3,
      name: 'Ana Maria',
      role: 'QA',
      progress: 60,
      status: 'active'
    },
    {
      id: 4,
      name: 'Carolina Mendes',
      role: 'Banco de Dados',
      progress: 0,
      status: 'inactive'
    }
  ]);

  const [tasks] = useState<TaskCategory[]>([
    { id: 1, name: 'Ana Maria', completed: true, assignee: 'Ana Maria' },
    { id: 2, name: 'Nicoli Silva', completed: true, assignee: 'Nicoli Silva' },
    { id: 3, name: 'Marcos Antonio', completed: true, assignee: 'Marcos Antônio'  },
    { id: 4, name: 'Fábio Júnior', completed: false, assignee: 'Fábio Júnior' },
    { id: 5, name: 'Carolina Mendes', completed: false, assignee: 'Carolina Mendes' }
  ]);

  const [trainingTasks] = useState<TaskCategory[]>([
    { id: 1, name: 'Ana Maria', completed: true },
    { id: 2, name: 'Nicoli Silva', completed: true },
    { id: 3, name: 'Marcos Antônio', completed: true },
    { id: 4, name: 'Fábio Júnior', completed: true }
  ]);

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
            <button className="w-full bg-[#660099] text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              Nova tarefa
            </button>
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
    </div>
  );
};

export default DashboardGestor;
