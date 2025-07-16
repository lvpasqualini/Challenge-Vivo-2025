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
