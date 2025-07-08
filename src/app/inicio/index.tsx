import Button from "../../components/Button/index";

export default function Inicio() {
    return(
        <div className="min-h-screen flex flex-col">
            <main className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-8 gap-6 md:gap-8">
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-[#660099] font-semibold text-center leading-tight max-w-4xl">
                Seja muito Bem-Vindo(a) ao Vivo Onboarding
                </h1>
                
                <div className="w-full max-w-4xl aspect-video">
                <iframe 
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ocy63OiI_sj_JlSo&autoplay=1&mute=1" 
                    title="YouTube video player"  
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
                </div>
                
                <p className="w-full max-w-2xl text-center text-base md:text-lg text-[#660099] px-4 leading-relaxed">
                "Na Vivo, você é parte do futuro que estamos construindo agora. 
                Cada ideia, cada passo, cada colaboração importa. Estamos muito felizes por ter você com a gente."
                </p>
                
                <Button onClick={() => alert("oi bia")}>
                Inicie sua jornada
                </Button>
            </main>
        </div>
    )
}
