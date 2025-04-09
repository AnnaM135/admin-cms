import { useSelector } from 'react-redux'

export default function Dashboard() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Welcome, {user?.name || 'Admin'}!</h1>
    </div>
  )
}
