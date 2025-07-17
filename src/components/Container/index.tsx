import type { ContainerProps } from '../../types/types'

export const Container = ({ children, className = '', variant = 'default' }: ContainerProps) => {
    const variants = {
        default: 'w-fit min-w-[200px]',
        full: 'w-full',
        fixed: 'w-80',
        responsive: 'w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl',
    }

    return (
        <div className={`${variants[variant]} ${className}`}>
            <div className="bg-[#D9D9D9] shadow-md rounded-sm flex flex-row items-center max-xl:flex-col justify-center p-4 h-fit">
                {children}
            </div>
        </div>
    )
}

export default Container