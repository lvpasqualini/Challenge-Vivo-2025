import type { ButtonProps } from '../../types/types';

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="mt-4 px-4 py-2 bg-[#660099] text-white rounded hover:scale-115 hover:ease-in-out duration-300" onClick={onClick}>
        {children}
    </button>
  )
}