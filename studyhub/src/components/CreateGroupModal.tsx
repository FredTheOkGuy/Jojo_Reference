import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CreateGroupPayload } from "../app/types";

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreateGroupPayload) => void;
  initialData?: CreateGroupPayload;
  mode?: "create" | "edit";
}

const inputClass =
  "w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]";

const fieldVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const emptyForm: CreateGroupPayload = {
  name: "",
  code: "",
  number: "",
  location: "",
  mapLocation: "",
  day: "",
  startTime: "17:00",
  endTime: "18:00",
  maxMembers: 8,
  isPrivate: false,
};

const normalizeDateForInput = (value: string) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
};

export default function CreateGroupModal({
  open,
  onClose,
  onCreate,
  initialData,
  mode = "create",
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

  const isEditMode = mode === "edit";

  useEffect(() => {
    if (!open) return;

    const data = initialData ?? emptyForm;
    setName(data.name);
    setCode(data.code);
    setNumber(data.number);
    setLocation(data.location);
    setMapLocation(data.mapLocation);
    setDate(normalizeDateForInput(data.day));
    setStartTime(data.startTime || "17:00");
    setEndTime(data.endTime || "18:00");
    setMaxMembers(String(data.maxMembers || 8));
    setIsPrivate(data.isPrivate);
  }, [initialData, open]);

  const resetCreateForm = () => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onCreate({
      name: name || "New Study Group",
      code: code.toUpperCase() || "MISC",
      number: number || "000",
      location: location || "TBD",
      mapLocation:
        mapLocation || location || "Concordia University, Montreal, QC",
      day: date || initialData?.day || "",
      startTime,
      endTime,
      maxMembers: parseInt(maxMembers) || 8,
      isPrivate,
    });

    if (!isEditMode) {
      resetCreateForm();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(26,22,16,.5)] px-3 backdrop-blur-sm"
          onClick={onClose}
        >
          <style>
            {`
              .studyhub-modal-scroll {
                scrollbar-width: thin;
                scrollbar-color: #c96332 #edeae2;
              }

              .studyhub-modal-scroll::-webkit-scrollbar {
                width: 8px;
              }

              .studyhub-modal-scroll::-webkit-scrollbar-track {
                background: #edeae2;
                border-radius: 999px;
                margin: 10px 0;
              }

              .studyhub-modal-scroll::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, #d97945, #c96332);
                border-radius: 999px;
                border: 2px solid #edeae2;
              }

              .studyhub-modal-scroll::-webkit-scrollbar-thumb:hover {
                background: #a34e24;
              }
            `}
          </style>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="w-full max-w-[min(28rem,94vw)] overflow-hidden rounded-[28px] border border-[#ddd8cc] bg-[#faf8f4] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="studyhub-modal-scroll max-h-[92dvh] overflow-y-auto">
              <div className="p-[clamp(1.125rem,5vw,1.75rem)] pr-[clamp(1rem,4vw,1.25rem)]">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="font-black text-2xl text-[#1a1610] font-['Syne'] leading-tight">
                      {isEditMode ? "Edit Study Group" : "Create Study Group"}
                    </span>
                    {isEditMode && (
                      <p className="mt-1 text-xs font-medium text-[#9a9282]">
                        Update the group info shown to members.
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileHover={{ rotate: 90, scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-lg bg-[#edeae2] border border-[#ddd8cc] text-[#4a4438] cursor-pointer text-sm font-bold flex items-center justify-center transition-all hover:bg-[#faeade] hover:text-[#c96332] flex-shrink-0"
                  >
                    ✕
                  </motion.button>
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  initial="hidden"
                  animate="show"
                  variants={{
                    show: { transition: { staggerChildren: 0.045 } },
                  }}
                >
                  <motion.div variants={fieldVariant} className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                      Group Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Signals & Systems Team"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </motion.div>

                  <motion.div
                    variants={fieldVariant}
                    className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                  >
                    <div className="flex-1">
                      <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                        Course Code
                      </label>
                      <input
                        type="text"
                        placeholder="COEN"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={inputClass}
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
                        className={inputClass}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fieldVariant} className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                      Room Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. H-561, LB 520, custom study room"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={inputClass}
                    />
                  </motion.div>

                  <motion.div variants={fieldVariant} className="mb-4">
                    <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                      Physical Map Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Concordia University Hall Building, Montreal, QC"
                      value={mapLocation}
                      onChange={(e) => setMapLocation(e.target.value)}
                      className={inputClass}
                    />
                  </motion.div>

                  <motion.div
                    variants={fieldVariant}
                    className="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                  >
                    <div className="flex-1">
                      <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={inputClass}
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
                        className={inputClass}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fieldVariant}
                    className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
                  >
                    <div className="flex-1">
                      <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className={inputClass}
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
                        className={inputClass}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={fieldVariant} className="mb-5 rounded-[12px] border border-[#ddd8cc] bg-[#edeae2] px-4 py-3">
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
                        className={`relative inline-flex h-8 w-16 items-center rounded-full border transition-all duration-200 ${isPrivate ? 'border-[#c96332] bg-[#c96332]' : 'border-[#cfc7b7] bg-[#d7d0c2]'}`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${isPrivate ? 'translate-x-8' : 'translate-x-0.5'}`}
                        />
                        <span className="sr-only">
                          {isPrivate ? 'Private group' : 'Public group'}
                        </span>
                      </button>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full py-3.5 bg-[#c96332] text-white font-bold rounded-[9px] transition-colors hover:bg-[#a34e24] hover:shadow-lg"
                  >
                    {isEditMode ? "Save Changes →" : "Create Group →"}
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
