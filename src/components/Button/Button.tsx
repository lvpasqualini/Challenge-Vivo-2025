export default function Button({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button className="mt-4 px-4 py-2 bg-[#660099] text-white rounded" onClick={onClick}>
        {children}
    </button>
  )
}
