import React, {useMemo, useState} from 'react';
import {Search, Users} from 'lucide-react';
import {mockUsers, mockDevices} from '../data/mockData';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return mockUsers;
    return mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  const deviceNameById = useMemo(() => {
    const map = new Map();
    for (const d of mockDevices) map.set(d.id, d.name);
    return map;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-slate-400">Manage users and assigned devices</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
          <Users className="h-5 w-5 text-blue-500" />
          <span className="text-slate-300 text-sm">{mockUsers.length} users</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search users by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{user.name}</h3>
                <p className="text-slate-400 text-sm">{user.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-blue-500/20 text-blue-400'
                }`}
              >
                {user.role.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-500 text-xs mb-1">User ID</p>
                <p className="text-blue-400 font-mono text-sm font-semibold">{user.id}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-500 text-xs mb-1">Created</p>
                <p className="text-slate-200 text-sm font-semibold">{user.createdAt}</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <p className="text-slate-400 text-sm font-medium mb-3">
                Assigned devices ({user.assignedDevices.length})
              </p>
              {user.assignedDevices.length === 0 ? (
                <p className="text-slate-500 text-sm">No devices assigned</p>
              ) : (
                <ul className="space-y-2">
                  {user.assignedDevices.map((id) => (
                    <li key={id} className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{deviceNameById.get(id) ?? id}</span>
                      <span className="text-slate-500 text-xs font-mono">{id}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No users found</p>
          <p className="text-slate-500 text-sm">Try adjusting your search</p>
        </div>
      )}
    </div>
  );
}

