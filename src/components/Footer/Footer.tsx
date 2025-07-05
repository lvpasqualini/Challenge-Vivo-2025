export default function Footer() {
  return (
    <footer className="flex justify-around items-center bg-[#660099] h-[6rem] p-4 shadow-md ">
      <section className="text-xs">
        <p className="text-white">
            Copyright 2025 ©QUANTUM CODE.
        </p>
        <p className="text-white">
            Todos os direitos reservados.
        </p>
      </section>
      <section className="text-white text-xs">
        <p><a className="hover:underline" href="">Política de Privacidade</a> | <a className="hover:underline" href="">Termos de Uso</a></p>
      </section>
      <section className="flex">
        <img className="w-[3rem] h-[3rem] object-contain" src="../../public/vivo_white.png" alt="icon da vivo"/>
        <div className="flex-col text-white">
          <h2><b>VIVO</b></h2>
          <h2><b>Onboarding</b></h2>
        </div>
      </section>
    </footer>
  )
}