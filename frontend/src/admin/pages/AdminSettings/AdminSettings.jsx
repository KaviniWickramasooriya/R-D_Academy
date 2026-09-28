import React, { useState } from 'react';
import { FiSave, FiSettings, FiLock, FiBell, FiGlobe } from 'react-icons/fi';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'R&D Academy Portal',
    supportEmail: 'support@rdacademy.com',
    enableRegistrations: true,
    maintenanceMode: false,
    emailNotifications: true,
  });

  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement API call to persist settings here
    setSavedMessage('Settings successfully saved!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-100">Platform Settings</h1>
        <p className="text-sm text-stone-400 mt-1">Configure global application preferences, controls, and communication options.</p>
      </div>

      {savedMessage && (
        <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-200 p-4 rounded-xl text-sm flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
            <FiGlobe className="text-[#d4af37] text-xl" />
            <h2 className="text-lg font-semibold text-stone-200">General Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase font-medium text-stone-400 mb-2">Portal Title / Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-stone-200 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase font-medium text-stone-400 mb-2">Admin Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-2.5 text-stone-200 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Operational Toggles */}
        <div className="bg-stone-900 border border-stone-800 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-stone-800">
            <FiSettings className="text-[#d4af37] text-xl" />
            <h2 className="text-lg font-semibold text-stone-200">Operations & Toggles</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg bg-stone-950 border border-stone-800/80 cursor-pointer hover:border-stone-700 transition-colors">
              <div>
                <span className="block font-medium text-stone-200 text-sm">Enable Public Registrations</span>
                <span className="text-xs text-stone-400">Allow new students to sign up via public application forms.</span>
              </div>
              <input
                type="checkbox"
                name="enableRegistrations"
                checked={settings.enableRegistrations}
                onChange={handleChange}
                className="w-5 h-5 accent-[#d4af37] bg-stone-900 border-stone-700 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-stone-950 border border-stone-800/80 cursor-pointer hover:border-stone-700 transition-colors">
              <div>
                <span className="block font-medium text-stone-200 text-sm">System Maintenance Mode</span>
                <span className="text-xs text-stone-400">Temporarily suspend student portal accessibility for updates.</span>
              </div>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="w-5 h-5 accent-[#d4af37] bg-stone-900 border-stone-700 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-stone-950 border border-stone-800/80 cursor-pointer hover:border-stone-700 transition-colors">
              <div>
                <span className="block font-medium text-stone-200 text-sm">Email Alerts on Submission</span>
                <span className="text-xs text-stone-400">Receive an instant email when a new student application arrives.</span>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="w-5 h-5 accent-[#d4af37] bg-stone-900 border-stone-700 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#d4af37] text-stone-950 font-semibold px-6 py-2.5 rounded-lg hover:bg-[#c29f30] transition-colors shadow-lg text-sm"
          >
            <FiSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}