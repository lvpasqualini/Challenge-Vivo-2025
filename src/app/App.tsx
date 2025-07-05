import Navbar from  "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";

export default function App() {
  return (
    <>
      <Navbar/>
      <main className="h-[90vh] flex flex-col items-center justify-center my-[3rem] gap-4">
        <h1 className="text-4xl text-[#660099] font-semibold pb-5">Seja muito Bem-Vindo(a) ao Vivo Onboarding </h1>
        <iframe width="750" height="600" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ocy63OiI_sj_JlSo&autoplay=1&mute=1" 
        title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        <p className="w-[40rem] text-center text-lg text-[#660099] mt-4 wrap-normal">"Na Vivo, você é parte do futuro que estamos construindo agora. 
        Cada ideia, cada passo, cada colaboração importa. Estamos muito felizes por ter você com a gente."</p>
        <Button onClick={() => alert("Apenas para teste")}>Inicie sua jornada</Button>
      </main>
      <Footer/>
    </>
  )
}