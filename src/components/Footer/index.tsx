export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center bg-[#660099] min-h-[6rem] p-4 shadow-md gap-4 md:gap-0">
      <section className="text-xs text-center md:text-left">
        <p className="text-white">
            Copyright 2025 ©QUANTUM CODE.
        </p>
        <p className="text-white">
            Todos os direitos reservados.
        </p>
      </section>
      <section className="text-white text-xs text-center">
        <p><a className="hover:underline" href="">Política de Privacidade</a> | <a className="hover:underline" href="">Termos de Uso</a></p>
      </section>
      <section className="flex items-center gap-2">
        <img className="w-[3rem] h-[3rem] object-contain" src="/vivo_white.png" alt="icon da vivo"/>
        <div className="flex flex-col text-white">
          <h2 className="font-bold">VIVO</h2>
          <h2 className="font-bold">Onboarding</h2>
        </div>
      </section>
    </footer>
  )
}