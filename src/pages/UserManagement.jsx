import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Search, Users, X } from 'lucide-react';
import { apiFetch } from '../lib/api';

const emptyForm = {
  username: '',
  password: '',
  fullname: '',
  cccd: '',
  email: '',
  phone: '',
  status: 'active',
  role: 'user',
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoadError('');
    setLoading(true);
    try {
      const list = await apiFetch('/api/users');
      setUsers(Array.isArray(list) ? list : []);
    } catch (e) {
      setLoadError(e.message || 'Không tải được danh sách');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        String(u.user_id).includes(q) ||
        u.fullname.toLowerCase().includes(q)
    );
  }, [searchTerm, users]);

  const openModal = () => {
    setForm(emptyForm);
    setSubmitError('');
    setModalOpen(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const cccdStr = String(form.cccd).replace(/\D/g, '');
      if (cccdStr.length !== 12) {
        throw new Error('CCCD phải đúng 12 chữ số');
      }
      const phoneVal =
        form.phone === '' || form.phone == null
          ? null
          : parseInt(String(form.phone).replace(/\D/g, ''), 10);
      if (phoneVal != null && Number.isNaN(phoneVal)) {
        throw new Error('Số điện thoại không hợp lệ');
      }
      await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
          fullname: form.fullname.trim(),
          cccd: cccdStr,
          email: form.email.trim() || null,
          phone: phoneVal,
          status: form.status,
          role: form.role,
        }),
      });
      setModalOpen(false);
      await loadUsers();
    } catch (err) {
      setSubmitError(err.message || 'Đăng ký thất bại');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quản lý người dùng</h1>
          <p className="text-slate-400">Chỉ admin mới tạo tài khoản mới tại đây</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
            <Users className="h-5 w-5 text-blue-500" />
            <span className="text-slate-300 text-sm">{users.length} tài khoản</span>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Đăng ký tài khoản
          </button>
        </div>
      </div>

      {loadError && (
        <div className="p-4 rounded-lg bg-red-900/30 border border-red-700 text-red-200 text-sm">{loadError}</div>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Tìm theo tên, username, email, ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-slate-400">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredUsers.map((u) => (
            <div
              key={u.user_id}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{u.fullname}</h3>
                  <p className="text-slate-400 text-sm">@{u.username}</p>
                  {u.email && <p className="text-slate-500 text-sm">{u.email}</p>}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    u.role === 'admin'
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {u.role.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">ID</p>
                  <p className="text-blue-400 font-mono font-semibold">{u.user_id}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">Trạng thái</p>
                  <p className="text-slate-200 font-semibold">{u.status}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 col-span-2">
                  <p className="text-slate-500 text-xs mb-1">CCCD</p>
                  <p className="text-white font-mono">{String(u.cccd)}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">Điện thoại</p>
                  <p className="text-slate-200">{u.phone ?? '—'}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                  <p className="text-slate-500 text-xs mb-1">Ngày tạo</p>
                  <p className="text-slate-200">{u.creat_at}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Không có người dùng</p>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h2 className="text-lg font-semibold text-white">Đăng ký tài khoản</h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleRegister} className="p-4 space-y-4">
              {[
                ['username', 'Tên đăng nhập', 'text'],
                ['password', 'Mật khẩu', 'password'],
                ['fullname', 'Họ và tên', 'text'],
                ['cccd', 'CCCD (12 số)', 'text'],
                ['email', 'Email', 'email'],
                ['phone', 'Số điện thoại (số nguyên)', 'text'],
              ].map(([key, label, type]) => (
                <div key={key}>
                  <label className="block text-sm text-slate-300 mb-1">{label}</label>
                  <input
                    type={type}
                    required={key !== 'email' && key !== 'phone'}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Trạng thái</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="active">active</option>
                    <option value="deactive">deactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Vai trò</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
              {submitError && (
                <div className="p-3 rounded bg-red-900/30 border border-red-700 text-red-200 text-sm">{submitError}</div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  {submitting ? 'Đang lưu...' : 'Tạo tài khoản'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
