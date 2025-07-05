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
      <ul className="flex space-x-4 ">
        <li className="hover:underline">Início</li>
        <li className="hover:underline">Primeiro dia</li>
        <li className="hover:underline">Conheça a vivo</li>
        <li className="hover:underline">Cultura e pessoas</li>
        <li className="hover:underline">Benefícios e ferramentas</li>
      </ul>
      <a className="flex items-center" href="">
        <LogIn/>
        <h4 className="hover:underline">Login</h4>
      </a>
    </nav>
  )
}

export default Navbar