import {LogIn} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="text-[#660099] flex items-center justify-between bg-white p-5 shadow-md">
      <a className="flex font-bold" href="/">
        <img className="w-[2.5rem] h-[2.5rem] object-contain" src="../../public/teste.png" alt="icon da vivo"/>
        <div className="flex-col">
          <h2><b>VIVO</b></h2>
          <h2><b>Onboarding</b></h2>
        </div>
      </a>
      <ul className="flex space-x-4">
        <li className="hover:underline"><a href="/home">Início</a></li>
        <li className="hover:underline"><a href="/primeiro-dia">Primeiro dia</a></li>
        <li className="hover:underline"><a href="/conheca-a-vivo">Conheça a vivo</a></li>
        <li className="hover:underline"><a href="/cultura-e-pessoas">Cultura e pessoas</a></li>
        <li className="hover:underline"><a href="/beneficios-e-ferramentas">Benefícios e ferramentas</a></li>
      </ul>
      <a className="flex items-center" href="">
        <LogIn/>
        <h4 className="hover:underline">Login</h4>
      </a>
    </nav>
  )
}

export default Navbar