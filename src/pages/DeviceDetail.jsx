import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, MapPin, Clock, Key, Edit2, Eye, EyeOff, Wifi, WifiOff, Activity } from 'lucide-react';
import { mockDevices, generateDeviceHistory } from '../data/mockData';
import ChangePasswordModal from '../components/ChangePasswordModal';

const DeviceDetail = () => {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const device = mockDevices.find(d => d.id === deviceId);
  const history = generateDeviceHistory(deviceId);

  if (!device) {
    return (
      <div className="text-center py-12">
        <Cpu className="h-16 w-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 text-lg">Device not found</p>
        <button
          onClick={() => navigate('/devices')}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Back to Devices
        </button>
      </div>
    );
  }

  const maskPassword = (password) => {
    return '•'.repeat(password.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/devices')}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="h-6 w-6 text-slate-400" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{device.name}</h1>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{device.location}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{device.lastUpdate}</span>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {device.status === 'online' ? (
            <>
              <Wifi className="h-5 w-5 text-green-500" />
              <span className="text-green-500 font-semibold">ONLINE</span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5 text-red-500" />
              <span className="text-red-500 font-semibold">OFFLINE</span>
            </>
          )}
        </div>
      </div>

      {/* Device Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Cpu className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-slate-400 text-sm font-medium">Device ID</p>
          </div>
          <p className="text-blue-400 font-mono text-lg font-bold">{device.id}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Activity className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-slate-400 text-sm font-medium">Device Type</p>
          </div>
          <p className="text-white text-lg font-bold">{device.type}</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 rounded-lg ${
              device.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <Activity className={`h-5 w-5 ${
                device.status === 'online' ? 'text-green-500' : 'text-red-500'
              }`} />
            </div>
            <p className="text-slate-400 text-sm font-medium">Current Reading</p>
          </div>
          <p className="text-white text-2xl font-bold">
            {device.value} <span className="text-slate-400 text-base">{device.unit}</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors duration-200 ${
              activeTab === 'account'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-4 font-semibold transition-colors duration-200 ${
              activeTab === 'history'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            History
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Device ID Section */}
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-white">Device Credentials</h3>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Device ID</label>
                    <div className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-3">
                      <p className="text-blue-400 font-mono font-semibold">{device.id}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-sm mb-2">Password</label>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 flex items-center justify-between">
                        <p className="text-white font-mono">
                          {showPassword ? device.password : maskPassword(device.password)}
                        </p>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="ml-2 p-1 hover:bg-slate-700 rounded transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-slate-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Information */}
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Device Information</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Name</span>
                    <span className="text-white font-medium">{device.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Type</span>
                    <span className="text-white font-medium">{device.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-slate-400">Location</span>
                    <span className="text-white font-medium">{device.location}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Status</span>
                    <span className={`font-semibold ${
                      device.status === 'online' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {device.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Device History</h3>
                <span className="text-slate-400 text-sm">{history.length} records</span>
              </div>

              {/* History Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        #
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Parameter Value
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {history.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-900 transition-colors duration-150">
                        <td className="px-6 py-4 text-slate-400 text-sm">
                          {record.id}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {record.parameterValue}
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">
                          {record.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal
          deviceId={device.id}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </div>
  );
};

export default DeviceDetail;
