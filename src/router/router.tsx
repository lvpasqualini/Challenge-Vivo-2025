import PrimeiroDia from '../app/primeiro-dia/index'
import ConhecaAVivo from '../app/conheca-a-vivo/index'
import CulturaPessoas from '../app/cultura-e-pessoas/index'
import BeneficiosFerramentas from '../app/beneficios-e-ferramentas/index'
import ErrorElement from '../app/error/index'
import Inicio from '../app/inicio/index'
import App from "../app/App"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: 'home',
        element: <Inicio />
      },
      {
        path: 'primeiro-dia',
        element: <PrimeiroDia />
      },
      {
        path: 'conheca-a-vivo',
        element: <ConhecaAVivo />
      },
      {
        path: 'cultura-e-pessoas',
        element: <CulturaPessoas />
      },
      {
        path: 'beneficios-e-ferramentas',
        element: <BeneficiosFerramentas />
      }
    ]
  }
])

export default router 