export type ButtonProps = {
  children?: React.ReactNode
  onClick?: () => void
}

export type CardProps = {
  title?: string
  icon?: React.ReactNode
}

export interface ContainerProps {
    children?: React.ReactNode
    className?: string
    variant?: 'default' | 'full' | 'fixed' | 'responsive'
}

export interface Tarefa {
  id?: number
  descricao: string
  dataInicio?: string
  dataFim: Date | string
  idFuncionario: number
}

export interface Treinamento {
  nome : string
  descricao : string
  cargaHoraria : number
  categoria : string
  dataFim : Date
  idFuncionario : number
}