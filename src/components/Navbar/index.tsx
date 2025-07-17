import { LogIn, Menu, X } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="w-full text-[#660099] bg-white shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a className="flex items-center gap-2 font-bold" href="/home">
            <img 
              className="w-[2.5rem] h-[2.5rem] object-contain" 
              src="/teste.png" 
              alt="icon da vivo"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-sm">VIVO</span>
              <span className="font-bold text-sm">Onboarding</span>
            </div>
          </a>

          {/* Menu Desktop */}
          <div className="hidden lg:flex">
            <ul className="flex space-x-6">
              <li><a href="/home" className="hover:underline hover:text-[#550088] transition-colors">Início</a></li>
              <li><a href="/primeiro-dia" className="hover:underline hover:text-[#550088] transition-colors">Primeiro dia</a></li>
              <li><a href="/conheca-a-vivo" className="hover:underline hover:text-[#550088] transition-colors">Conheça a vivo</a></li>
              <li><a href="/cultura-e-pessoas" className="hover:underline hover:text-[#550088] transition-colors">Cultura e pessoas</a></li>
              <li><a href="/beneficios-e-ferramentas" className="hover:underline hover:text-[#550088] transition-colors">Benefícios e ferramentas</a></li>
            </ul>
          </div>

          {/* Login Desktop */}
          <div className="hidden lg:flex">
            <a href="/login" className="flex items-center gap-2 hover:underline hover:text-[#550088] transition-colors">
              <LogIn size={20} />
              <span>Login</span>
            </a>
          </div>

          {/* Botão Menu Mobile */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#660099]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <ul className="space-y-4">
            <li>
              <a 
                href="/home" 
                className="block py-2 hover:text-[#550088] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
            </li>
            <li>
              <a 
                href="/primeiro-dia" 
                className="block py-2 hover:text-[#550088] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Primeiro dia
              </a>
            </li>
            <li>
              <a 
                href="/conheca-a-vivo" 
                className="block py-2 hover:text-[#550088] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Conheça a vivo
              </a>
            </li>
            <li>
              <a 
                href="/cultura-e-pessoas" 
                className="block py-2 hover:text-[#550088] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cultura e pessoas
              </a>
            </li>
            <li>
              <a 
                href="/beneficios-e-ferramentas" 
                className="block py-2 hover:text-[#550088] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefícios e ferramentas
              </a>
            </li>
            <li className="border-t border-gray-200 pt-4">
              <a 
                href="/login" 
                className="flex items-center gap-2 py-2 hover:text-[#550088] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={20} />
                <span>Login</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar