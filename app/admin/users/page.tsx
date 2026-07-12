import { getUsers, createUser, deleteUser } from '@/app/admin/actions/cms'
import { Role } from '@prisma/client'

const ADMIN_ROLES = [Role.SUPER_ADMIN, Role.CONTENT_MANAGER, Role.COMMERCIAL_MANAGER]

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Users</h2>
      <form action={createUser} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input name="email" type="email" placeholder="Email" required className="rounded-md border-gray-300 px-3 py-2 border" />
          <input name="name" placeholder="Name" className="rounded-md border-gray-300 px-3 py-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select name="role" defaultValue={Role.CONTENT_MANAGER} className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border">
              {ADMIN_ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" placeholder="Password" required className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2 border" />
          </div>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add User</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.name || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <form action={deleteUser.bind(null, user.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:text-red-900">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
