export default function CulturaPessoas() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 gap-6 md:gap-8">
        <h1 className="text-2xl mb-5 md:text-4xl lg:text-3xl text-[#660099] font-semilight text-center leading-tight max-w-4xl">
            Cultura e Pessoas
        </h1>

        <section className="">
            <iframe 
                className="w-full h-[50vh] rounded-lg shadow-lg mb-6"
                src="https://www.youtube.com/embed/h_D3VFfhvs4?si=WXB5JWXapyor74H2" 
                title="YouTube video player"  
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
            <p className="w-full max-w-2xl text-base md:text-lg px-4 leading-relaxed">
                A Vivo, marca comercial da Telefônica Brasil, é reconhecida não apenas pela excelência nos serviços de telecomunicações, 
                mas também por sua forte cultura organizacional e pelo foco em valorizar as pessoas. 
                A empresa adota como propósito "Digitalizar para Aproximar", refletindo seu compromisso em transformar a vida dos clientes, 
                colaboradores e da sociedade por meio da tecnologia e da conexão humana.
                Na Vivo, a cultura é orientada pela inovação, diversidade, inclusão e sustentabilidade. 
                A companhia busca constantemente criar um ambiente onde cada pessoa possa ser autêntica, desenvolver seus talentos e contribuir para a evolução do negócio. 
                Programas de diversidade e inclusão são pilares importantes, com iniciativas voltadas para a equidade de gênero, 
                inclusão de pessoas LGBTQIAPN+, pessoas com deficiência, e a valorização da pluralidade racial e cultural.
            </p>
        </section>

        <section className="w-full max-w-2xl flex">
            <p className="w-full max-w-xl text-base md:text-lg px-4 leading-relaxed">As pessoas que trabalham na Vivo são consideradas o maior ativo da
            companhia. Por isso, a empresa investe fortemente em programas de capacitação, 
            desenvolvimento profissional, bem-estar e qualidade de vida. </p>
            <img className="w-3xs" src="https://www.flowup.me/blog/wp-content/uploads/2018/04/Design-sem-nome-2.png-1.webp" alt="imagem de uma equipe motivada" />
        </section>

        <section>
            <p className="w-full max-w-2xl text-base md:text-lg px-4 leading-relaxed">A Vivo também promove um ambiente de inovação aberta, estimulando a criatividade, o intraempreendedorismo e 
                a adoção de novas tecnologias.</p>
        </section>
        <div className="w-3xl border-t-2 border-[#660099]"></div>
      </main>
    </div>
  )
}