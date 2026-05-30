import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CreateGroupPayload } from '../app/types';

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateGroupPayload) => void;
}

export default function CreateGroupModal({ open, onClose, onCreate }: CreateGroupModalProps) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('17:00');
  const [maxMembers, setMaxMembers] = useState('8');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreate({
      name: name || 'New Study Group',
      code: code.toUpperCase() || 'MISC',
      number: number || '000',
      location: location || 'TBD',
      day,
      time,
      maxMembers: parseInt(maxMembers) || 8,
    });
    // Reset form
    setName('');
    setCode('');
    setNumber('');
    setLocation('');
    setDay('Monday');
    setTime('17:00');
    setMaxMembers('8');
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[rgba(26,22,16,.5)] z-50 flex items-center justify-center backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-[#faf8f4] border border-[#ddd8cc] rounded-5xl p-7 w-96 max-w-[94vw] shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-black text-2xl text-[#1a1610] font-['Syne']">Create Study Group</span>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-[#edeae2] border border-[#ddd8cc] text-[#4a4438] cursor-pointer text-sm font-bold flex items-center justify-center transition-all hover:bg-[#faeade] hover:text-[#c96332]"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Group Name */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Group Name
              </label>
              <input
                type="text"
                placeholder="e.g. Signals & Systems Team"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
              />
            </div>

            {/* Code & Number Row */}
            <div className="flex gap-2.5 mb-4">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                  Course Code
                </label>
                <input
                  type="text"
                  placeholder="COEN"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                  Course Number
                </label>
                <input
                  type="text"
                  placeholder="244"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Location
              </label>
              <input
                type="text"
                placeholder="e.g. LB 520, Webster Library"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
              />
            </div>

            {/* Day & Time Row */}
            <div className="flex gap-2.5 mb-4">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                  Day
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
                />
              </div>
            </div>

            {/* Max Members */}
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Max Members
              </label>
              <input
                type="number"
                min="2"
                max="30"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#c96332] text-white font-bold rounded-[9px] transition-all hover:bg-[#a34e24] active:scale-95 hover:shadow-lg"
            >
              Create Group →
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
