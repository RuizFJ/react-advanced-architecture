import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";
import UserFormModal from "../components/UserFormModal";
import type { User } from "@/api/users.api";

function UsersPage() {
  const { data: users, isLoading, isError } = useUsers();
  const deleteUser = useDeleteUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };
  const handleCreate = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };
  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      deleteUser.mutate(id);
    }
  };

  const getRoleNames = (user: User) => user.roles.map((r) => r.role.name);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400 text-sm">Cargando usuarios...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-sm">Error al cargar los usuarios</p>
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-500 text-sm mt-1">
            {users?.length ?? 0} usuarios registrados
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition"
        >
          + Nuevo usuario
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roles
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Creado
              </th>
              <th className="text-right px-6 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-semibold shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {getRoleNames(user).map((role) => (
                      <span
                        key={role}
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : role === "moderator"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {new Date(user.createdAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && <UserFormModal user={selectedUser} onClose={handleClose} />}
    </div>
  );
}

export default UsersPage;
