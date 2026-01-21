export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded"
    >
      {children}
    </button>
  )
}
