import Button from "../../components/Button"
import CardIcon from "../../components/CardIcon"
import { SquareUserRound, Bot , Handshake , ChartNoAxesCombined } from "lucide-react"

export default function PrimeiroDia() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 gap-6 md:gap-8">
        <section>
          <h1 className="text-2xl mb-5 md:text-4xl lg:text-3xl text-[#660099] font-semilight text-center leading-tight max-w-4xl">
            Primeiro dia
          </h1>
        
          <p className="w-full max-w-2xl text-center text-base md:text-lg px-4 leading-relaxed">
            Parabéns e seja muito bem-vindo(a) à Vivo!
            Hoje começa uma nova jornada e estamos felizes por ter você com a gente. Aqui, acreditamos no poder da conexão para transformar vidas — e é com essa energia que queremos que você se sinta acolhido(a), motivado(a) e pronto(a) para crescer junto conosco.
            Seu primeiro dia será dedicado a conhecer melhor a Vivo: quem somos, no que acreditamos e como trabalhamos. Você vai entender nossa cultura, nossos valores e o impacto que geramos todos os dias por meio da inovação, da tecnologia e do nosso compromisso com a sustentabilidade e a inclusão.
            Além disso, você será apresentado(a) ao seu time, entenderá mais sobre a estrutura da empresa, terá acesso aos nossos sistemas e às ferramentas que vão te ajudar a ter uma jornada incrível por aqui.
            Lembre-se: você não está sozinho(a). Nossa equipe de Pessoas, seu gestor(a) e seus colegas estarão ao seu lado em cada etapa, prontos para apoiar, ensinar e aprender com você.
            Prepare-se para fazer parte de algo grande. Porque na Vivo, digital é fazer diferente. E você já faz parte disso.
          </p>
        </section>

        <section className="max-w-4xl">
          <div className="grid grid-rows-1 grid-cols-4 justify-center gap-20 pt-8 max-sm:grid-rows-2 max-sm:grid-cols-2 max-sm:gap-8">
            <CardIcon
              icon={<SquareUserRound className="w-12 h-12 text-[#660099] mb-2" />}
              title="Converse com seu gestor"
            />
            <CardIcon
              icon={<Bot className="w-12 h-12 text-[#660099] mb-2" />}
              title="ChatBot para dúvidas"
            />
            <CardIcon
              icon={<ChartNoAxesCombined className="w-12 h-12 text-[#660099] mb-2" />}
              title="Acompanhe sua evolução"
            />
            
            <CardIcon
              icon={<Handshake className="w-12 h-12 text-[#660099] mb-2" />}
              title="Conheça sua equipe"
            />
          </div>
        </section>
        
        <Button onClick={() => alert("Apenas para teste")}>
          Inicie sua jornada
        </Button>
        <div className="w-[80%] border-t-2 border-[#660099]"></div>
      </main>
    </div>
  )
}