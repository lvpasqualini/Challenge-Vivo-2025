import Container from "../../components/Container";

type Gestor = {
    name: string;
}

type Membro = {
    name: string;
    profession: string;
}

type Atividade = {
    id: number;
    nome: string;
    concluida: boolean;
}

export default function DashboardColaborador() {
    const gestor: Gestor = {
        name: "João Silva"
    }

    const user = {
        name: "Ana Maria",
        profession: "QA"
    }

    const atividades: Atividade[] = [
        { id: 1, nome: "Assistir vídeo introdutório", concluida: true },
        { id: 2, nome: "Conhecer a equipe", concluida: true },
        { id: 3, nome: "Configurar ferramentas", concluida: true },
        { id: 4, nome: "Ler manual de conduta", concluida: false },
        { id: 5, nome: "Completar treinamento de segurança", concluida: false },
        { id: 6, nome: "Participar da reunião de boas-vindas", concluida: false },
        { id: 7, nome: "Finalizar cadastro no sistema", concluida: false },
        { id: 8, nome: "Desafio Básico de QA", concluida: false },
    ]

    // Calcular progresso
    const atividadesConcluidas = atividades.filter(ativ => ativ.concluida).length
    const totalAtividades = atividades.length
    const porcentagemProgresso = Math.round((atividadesConcluidas / totalAtividades) * 100)

    // Separar atividades por status
    const concluidas = atividades.filter(ativ => ativ.concluida)
    const naoConcluidas = atividades.filter(ativ => !ativ.concluida)

    const equipe: Membro[] = [
        {
            name: "Fábio Junior",
            profession: "Engenheiro de software",
        },
        {
            name: "Marcos Antônio",
            profession: "QA",
        },
        {
            name: "Carolina Mendes",
            profession: "Banco de Dados",
        },
        {
            name: "Lucas Pasqualini",
            profession: "Dev Master",
        },
        {
            name: "Silvio Toshiaki",
            profession: "Piranha",
        },
        {
            name: "Pietro de Paula",
            profession: "Front-End",
        },
    ]

    return (
        <div className="p-6 space-y-6 flex flex-col justify-center items-center">
            <h1>ÁREA DE TAREFAS</h1>
            {/* Seção do Gestor */}
            <Container variant="responsive" className="">
                <div className="space-y-4 m-4 w-[20rem]">
                    <div className="text-center space-y-3 p-[2rem]">
                        <h2 className="text-xl font-bold text-[#660099] mb-4">Seu Gestor</h2>
                        <div className="w-20 h-20 bg-[#660099] rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl">
                            {gestor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">{gestor.name}</h4>
                        <p className="text-sm text-gray-600">Gerente</p>
                    </div>
                </div>
            
                {/* Seção da Equipe */}
                <div className="w-full">
                    <h2 className="text-xl text-center font-bold text-[#660099] mb-5">Sua Equipe</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 justify-items-center">
                        {equipe.map((membro, index) => (
                            <Container 
                                variant="responsive" 
                                key={index} 
                                className="hover:scale-105 transition-transform duration-300"
                            >
                                <div className="max-h-[250px] min-h-[255px] text-center space-y-3 min-w-[100px] p-4">
                                    <div className="w-16 h-16 bg-[#660099] rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg">
                                        {membro.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-bold text-gray-800">{membro.name}</h3>
                                        <p className="text-sm text-gray-600">{membro.profession}</p>
                                    </div>
                                    
                                    <div className="flex justify-center items-center gap-2">
                                        <a href="#"><img className="w-10 h-10" src="/teams.png" alt="Teams" /></a>
                                        <a href="#"><img className="w-10 h-10" src="/whatsapp.png" alt="WhatsApp" /></a>
                                    </div>
                                </div>
                            </Container>
                        ))}
                    </div>
                </div>
            </Container>

            <Container variant="responsive" className="">
                <div className="space-y-4 m-4 w-[20rem]">
                    <div className="text-center space-y-3 p-[2rem]">
                        <div className="w-20 h-20 bg-[#660099] rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.profession}</p>
                        
                        {/* Barra de Progresso */}
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 text-xs">Seu progresso:</span>
                                <span className="font-bold text-[#660099]">{porcentagemProgresso}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-[#660099] h-3 rounded-full transition-all duration-500 ease-in-out"
                                    style={{ width: `${porcentagemProgresso}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                {atividadesConcluidas} de {totalAtividades} atividades concluídas
                            </p>
                        </div>
                    </div>
                </div>
            
                {/* Seção de tarefas */}
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-4 justify-items-center">
                        <Container 
                            variant="responsive"  
                            className="hover:scale-105 transition-transform duration-300"
                        >
                            <div className="max-h-[250px] min-h-[255px] text-center space-y-3 min-w-[100px]">
                                <h5 className="text-sm font-semibold underline text-green-600">
                                    Concluidas: ({concluidas.length})
                                </h5>
                                <ul className="text-xs space-y-1">
                                    {naoConcluidas.map((atividade) => (
                                        <li key={atividade.id} className="flex items-center gap-2">
                                            <span>○</span>
                                            {atividade.nome}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Container>
                        
                        <Container 
                            variant="responsive"  
                            className="hover:scale-105 transition-transform duration-300"
                        >
                            <div className="max-h-[250px] min-h-[255px] text-center space-y-3 min-w-[100px]">
                                <h5 className="text-sm font-semibold underline text-orange-600">
                                    Pendentes ({naoConcluidas.length})
                                </h5>
                                <ul className="text-xs space-y-1">
                                    {naoConcluidas.map((atividade) => (
                                        <li key={atividade.id} className="flex items-center gap-2">
                                            <span className="text-orange-500">○</span>
                                            {atividade.nome}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Container>
                        
                        <Container 
                            variant="responsive"  
                            className="hover:scale-105 transition-transform duration-300"
                        >
                            <div className="max-h-[250px] min-h-[255px] text-center space-y-3 min-w-[100px] flex flex-col justify-between">
                                <h5 className="text-sm font-light underline">Simulador de projetos</h5>
                                <p className="text-xs font-semibold">Desafios com a cara da Vivo? Use seu talento para inovar e simplificar, do nosso jeito!</p>
                                <p className="text-xs">Desafio 01: Desafio Básico de QA: "O Cadastro Simplificado Vivo". Clique e baixe o arquivo <a className="underline font-semibold" href="#">aqui</a></p>
                            </div>
                        </Container>
                    </div>
                </div>
            </Container>
        </div>
    )
}