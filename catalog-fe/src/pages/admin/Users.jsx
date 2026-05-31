import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import apiClient from "../../utils/services/apiClient";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sort, setSort] = useState("dibuat_pada");
  const [order, setOrder] = useState("desc");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    peran: "user",
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch users
  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await apiClient.get("/admin/users", {
        params: {
          page,
          per_page: perPage,
          search,
          sort,
          order,
        },
      });

      if (response.data.status) {
        setUsers(response.data.data.data || []);
        setCurrentPage(response.data.data.current_page || 1);
        setTotalPages(response.data.data.last_page || 1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Gagal mengambil data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchUsers(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, perPage, sort, order]);

  // Handle add user
  const handleAddUser = async () => {
    try {
      setFormErrors({});
      const errors = {};

      if (!formData.nama.trim()) errors.nama = "Nama harus diisi";
      if (!formData.email.trim()) errors.email = "Email harus diisi";
      if (!formData.password.trim()) errors.password = "Password harus diisi";
      if (formData.password.length < 8) errors.password = "Password minimal 8 karakter";
      if (!formData.peran) errors.peran = "Role harus dipilih";

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const response = await apiClient.post("/admin/users", formData);

      if (response.data.status) {
        alert("User berhasil ditambahkan");
        setShowAddModal(false);
        resetForm();
        fetchUsers(1);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Gagal menambahkan user");
      }
    }
  };

  // Handle edit user
  const handleEditUser = async () => {
    try {
      setFormErrors({});
      const errors = {};

      if (!formData.nama.trim()) errors.nama = "Nama harus diisi";
      if (!formData.email.trim()) errors.email = "Email harus diisi";
      if (!formData.peran) errors.peran = "Role harus dipilih";

      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const updateData = {
        nama: formData.nama,
        email: formData.email,
        peran: formData.peran,
      };

      const response = await apiClient.put(
        `/admin/users/${selectedUser.id}`,
        updateData
      );

      if (response.data.status) {
        alert("User berhasil diperbarui");
        setShowEditModal(false);
        resetForm();
        fetchUsers(currentPage);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Gagal memperbarui user");
      }
    }
  };

  // Handle delete user
  const handleDeleteUser = async () => {
    try {
      const response = await apiClient.delete(`/admin/users/${selectedUser.id}`);

      if (response.data.status) {
        alert("User berhasil dihapus");
        setShowDeleteModal(false);
        setSelectedUser(null);
        fetchUsers(currentPage > 1 ? currentPage : 1);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user");
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (user) => {
    try {
      const response = await apiClient.post(
        `/admin/users/${user.id}/toggle-status`
      );

      if (response.data.status) {
        fetchUsers(currentPage);
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Gagal mengubah status user");
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      nama: user.nama,
      email: user.email,
      password: "",
      peran: user.peran,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      email: "",
      password: "",
      peran: "user",
    });
    setFormErrors({});
  };

  const getRoleBadge = (role) => {
    const styles = {
      user: "bg-blue-100 text-blue-700",
      admin: "bg-orange-100 text-orange-700",
      superadmin: "bg-red-100 text-red-700",
    };
    const labels = {
      user: "User",
      admin: "Admin",
      superadmin: "Super Admin",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[role] || styles.user}`}>
        {labels[role]}
      </span>
    );
  };

  const getStatusBadge = (isActive) => {
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
        isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
      }`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    );
  };

  const maskPassword = (password) => {
    if (!password) return "-";
    return password.substring(0, 14) + "**************";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500">Kelola seluruh user dan admin</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          Tambah User
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:border-blue-500 text-sm"
        >
          <option value={5}>5 per halaman</option>
          <option value={10}>10 per halaman</option>
          <option value={20}>20 per halaman</option>
          <option value={50}>50 per halaman</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">ID</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Nama</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Email</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Role</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Password Hash</th>
                <th className="px-6 py-3 text-left font-semibold text-slate-700">Bergabung</th>
                <th className="px-6 py-3 text-center font-semibold text-slate-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                    Loading...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                    Tidak ada data user
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium text-slate-900">#{user.id}</td>
                    <td className="px-6 py-4 text-slate-900">{user.nama}</td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.peran)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className="cursor-pointer"
                      >
                        {getStatusBadge(user.is_active)}
                      </button>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                      {maskPassword(user.password)}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">
                      {new Date(user.dibuat_pada).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Halaman {currentPage} dari {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const page = Math.max(1, currentPage - 2) + i;
              if (page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Modal Add User */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Tambah User Baru</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Nama lengkap"
                />
                {formErrors.nama && <p className="text-xs text-red-600 mt-1">{formErrors.nama}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="email@example.com"
                />
                {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Minimal 8 karakter"
                />
                {formErrors.password && <p className="text-xs text-red-600 mt-1">{formErrors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.peran}
                  onChange={(e) => setFormData({ ...formData, peran: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
                {formErrors.peran && <p className="text-xs text-red-600 mt-1">{formErrors.peran}</p>}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit User */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Edit User</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {formErrors.nama && <p className="text-xs text-red-600 mt-1">{formErrors.nama}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.peran}
                  onChange={(e) => setFormData({ ...formData, peran: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
                {formErrors.peran && <p className="text-xs text-red-600 mt-1">{formErrors.peran}</p>}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleEditUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Delete User */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Hapus User?</h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-slate-600">
                Apakah Anda yakin ingin menghapus user <strong>{selectedUser?.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteUser}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
