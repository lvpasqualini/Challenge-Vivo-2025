export default function ConhecaAVivo() {        
    return (
        <div className="min-h-screen flex flex-col">
            <main className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 gap-6 md:gap-8 border-b-2 border-[#660099]">
                <section>
                    <h1 className="text-2xl mb-5 md:text-4xl lg:text-3xl text-[#660099] font-semilight text-center leading-tight max-w-4xl">
                        Conheça a Vivo
                    </h1>
        
                    <p className="w-full max-w-2xl text-center text-base md:text-lg px-4 leading-relaxed">
                        A Vivo é uma marca da Telefônica Brasil, líder no setor de telecomunicações do país. Mais do que oferecer serviços de telefonia móvel, 
                        fixa, internet banda larga e TV por assinatura, a Vivo conecta pessoas, negócios e ideias.
                    </p>
                    <p className="w-full max-w-2xl text-center text-base md:text-lg px-4 leading-relaxed">
                        Com presença em todo o território nacional, a Vivo acredita na tecnologia como uma aliada da transformação digital e da inclusão. 
                        A empresa investe continuamente em inovação e na expansão de sua infraestrutura, sendo pioneira na implantação da rede 5G no Brasil.
                    </p>
                    <p className="w-full max-w-2xl text-center text-base md:text-lg px-4 leading-relaxed">
                        Além da excelência em conectividade, a Vivo também promove soluções digitais em áreas como educação, saúde, entretenimento e serviços financeiros, 
                        sempre com foco em melhorar a vida das pessoas e apoiar o crescimento das empresas.
                    </p>
                    <p className="w-full max-w-2xl text-center text-base md:text-lg px-4 leading-relaxed">
                        Comprometida com a sustentabilidade e a responsabilidade social, a Vivo atua com transparência, respeito ao meio 
                        ambiente e incentivo à diversidade, impactando positivamente a sociedade e contribuindo para um futuro mais conectado e inteligente.
                        Vivo. Digital é fazer diferente.
                    </p>
                </section>
                <section className="w-2xl max-w-4xl aspect-video">
                    <iframe 
                        className="w-full h-full rounded-lg shadow-lg"
                        src="https://www.youtube.com/embed/h_D3VFfhvs4?si=WXB5JWXapyor74H2" 
                        title="YouTube video player"  
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </section>
                <div className="w-3xl border-t-2 border-[#660099]"></div>
            </main>
        </div>                
    )
}