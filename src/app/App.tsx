import { Outlet } from "react-router-dom"
import Chat from "../components/Chat"

export default function App() {
  return (
    <>
      <Outlet />
      <Chat />
    </>
  )
}