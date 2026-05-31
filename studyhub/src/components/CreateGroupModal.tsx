import { useState } from "react";
import type { FormEvent } from "react";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    code: string;
    number: string;
    isPrivate: boolean;
    location: string;
    mapLocation: string;
    day: string;
    startTime: string;
    endTime: string;
    maxMembers: number;
  }) => void;
}

export default function CreateGroupModal({
  open,
  onClose,
  onCreate,
}: CreateGroupModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const [mapLocation, setMapLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("17:00");
  const [endTime, setEndTime] = useState("18:00");
  const [maxMembers, setMaxMembers] = useState("8");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onCreate({
      name: name || "New Study Group",
      code: code.toUpperCase() || "MISC",
      number: number || "000",
      location: location || "TBD",
      mapLocation:
        mapLocation || location || "Concordia University, Montreal, QC",
      day: date,
      startTime,
      endTime,
      maxMembers: parseInt(maxMembers) || 8,
      isPrivate,
    });

    setName("");
    setCode("");
    setNumber("");
    setLocation("");
    setMapLocation("");
    setDate("");
    setStartTime("17:00");
    setEndTime("18:00");
    setMaxMembers("8");
    setIsPrivate(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(26,22,16,.5)] z-50 flex items-center justify-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#faf8f4] border border-[#ddd8cc] rounded-5xl p-7 w-96 max-w-[94vw] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="font-black text-2xl text-[#1a1610] font-['Syne']">
            Create Study Group
          </span>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#edeae2] border border-[#ddd8cc] text-[#4a4438] cursor-pointer text-sm font-bold flex items-center justify-center transition-all hover:bg-[#faeade] hover:text-[#c96332]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
              Room Location
            </label>

            <input
              type="text"
              placeholder="e.g. H-561, LB 520, custom study room"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
              Physical Map Location
            </label>

            <input
              type="text"
              placeholder="e.g. Concordia University Hall Building, Montreal, QC"
              value={mapLocation}
              onChange={(e) => setMapLocation(e.target.value)}
              className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
            />
          </div>

          <div className="flex gap-2.5 mb-4">
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
              />
            </div>

            <div className="flex-1">
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
          </div>

          <div className="flex gap-2.5 mb-5">
            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
              />
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
              />
            </div>
          </div>

          <div className="mb-5 rounded-[12px] border border-[#ddd8cc] bg-[#edeae2] px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1">
                  Group Privacy
                </label>
                <p className="text-xs text-[#9a9282] font-medium">
                  Switch between a public group and a private group.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isPrivate}
                onClick={() => setIsPrivate((current) => !current)}
                className={`relative inline-flex h-8 w-16 items-center rounded-full border transition-all duration-200 ${
                  isPrivate
                    ? "border-[#c96332] bg-[#c96332]"
                    : "border-[#cfc7b7] bg-[#d7d0c2]"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    isPrivate ? "translate-x-6" : "translate-x-1"
                  }`}
                />
                <span className="sr-only">
                  {isPrivate ? "Private group" : "Public group"}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#c96332] text-white font-bold rounded-[9px] transition-all hover:bg-[#a34e24] active:scale-95 hover:shadow-lg"
          >
            Create Group →
          </button>
        </form>
      </div>
    </div>
  );
}
