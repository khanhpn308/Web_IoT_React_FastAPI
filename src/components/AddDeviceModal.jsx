import React, { useState } from 'react';
import { X, Cpu, AlertCircle } from 'lucide-react';

const AddDeviceModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Temperature',
    location: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const deviceTypes = [
    'Temperature',
    'Humidity',
    'Motion',
    'Thermostat',
    'Air Quality',
    'Lighting',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Device name is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newDevice = {
        id: 'DEV' + String(Date.now()).slice(-3),
        name: formData.name,
        type: formData.type,
        status: 'online',
        location: formData.location,
        lastUpdate: 'Just now',
        password: formData.password,
        value: 0,
        unit: formData.type === 'Temperature' ? '°C' : 
              formData.type === 'Humidity' ? '%' :
              formData.type === 'Lighting' ? '%' : 'units'
      };
      
      onAdd(newDevice);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Cpu className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Add New Device</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Device Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Device Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border ${
                errors.name ? 'border-red-500' : 'border-slate-600'
              } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="e.g., Temperature Sensor A"
            />
            {errors.name && (
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Device Type */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Device Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {deviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border ${
                errors.location ? 'border-red-500' : 'border-slate-600'
              } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="e.g., Building A - Floor 1"
            />
            {errors.location && (
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.location}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Device Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-slate-700 border ${
                errors.password ? 'border-red-500' : 'border-slate-600'
              } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter device password"
            />
            {errors.password && (
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/50"
            >
              Add Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;
