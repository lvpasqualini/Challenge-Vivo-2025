import type { CardProps } from "../../types/types"

const Card = ({ title, icon } : CardProps) => {
  return (
    <div className="max-w-25 hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="bg-[#D9D9D9] shadow-md rounded-sm w-25 h-25 flex flex-col items-center justify-center  p-4">
            {icon}
        </div>
        <p className="wrap-anywhere text-center text-sm font-medium text-[#660099] break-words w-full overflow-hidden">{title}</p>
    </div>
  )
}

export default Card