// src/containers/Roles/RoleList.jsx
import {
    useGetRolesQuery,
    useDeleteRoleMutation,
  } from '../../features/roles/roleApi'
  import { Link } from 'react-router-dom'
  
  export default function RoleList() {
    const { data: roles, isLoading } = useGetRolesQuery()
    const [deleteRole] = useDeleteRoleMutation()
  
    if (isLoading) return <p>Loading...</p>
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Roles</h2>
        <Link to="/roles/create" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
          + Create Role
        </Link>
        <ul className="divide-y">
          {roles?.map((role) => (
            <li key={role.id} className="flex justify-between py-2">
              <span>{role.name}</span>
              <div className="space-x-2">
                <Link to={`/roles/${role.id}/edit`} className="text-blue-600">Edit</Link>
                <button onClick={() => deleteRole(role.id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  