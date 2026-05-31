import { useEffect, useMemo, useState } from "react";
import {
  editCourse,
  editDate,
  editLocation,
  editMaxStudents,
  editTime,
} from "@/queries/study_group";
import { db } from "@/services/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

interface EditGroupModalProps {
  open: boolean;
  group: any;
  onClose: () => void;
  onSaved: (updatedFields: Record<string, any>) => void;
}

function toDateInput(value: any) {
  const d = value?.toDate?.() ?? (value instanceof Date ? value : null);
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-CA");
}

function toTimeInput(value: any) {
  const d = value?.toDate?.() ?? (value instanceof Date ? value : null);
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function makeDateTime(date: string, time: string) {
  return new Date(`${date}T${time}`);
}

export default function EditGroupModal({ open, group, onClose, onSaved }: EditGroupModalProps) {
  const [groupName, setGroupName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [room, setRoom] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxStudents, setMaxStudents] = useState("8");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!group || !open) return;

    setGroupName(group.groupName ?? "");
    setCourseCode(group.courseCode ?? "");
    setCourseNumber(group.courseNumber ?? "");
    setRoom(group.studyRoom ?? "");
    setAddress(group.studyAddress ?? group.location ?? "");
    setDate(toDateInput(group.studyDate));
    setStartTime(toTimeInput(group.studyTimeStart) || group.startTime || "17:00");
    setEndTime(toTimeInput(group.studyTimeEnd) || group.endTime || "19:00");
    setMaxStudents(String(group.maxStudents ?? 8));
  }, [group, open]);

  const inputCls = useMemo(
    () =>
      "w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]",
    []
  );

  const labelCls = "block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!group?.id) return;

    const cleanName = groupName.trim() || "New Study Group";
    const cleanCourseCode = courseCode.trim().toUpperCase() || "MISC";
    const cleanCourseNumber = courseNumber.trim() || "000";
    const cleanRoom = room.trim() || "TBD";
    const cleanAddress = address.trim() || "Concordia University, Montreal, QC";
    const cleanMax = Math.max(2, Number.parseInt(maxStudents, 10) || 8);

    if (!date || !startTime || !endTime) {
      alert("Please choose a date, start time, and end time.");
      return;
    }

    const startDate = makeDateTime(date, startTime);
    const endDate = makeDateTime(date, endTime);

    if (endDate <= startDate) {
      alert("End time must be after start time.");
      return;
    }

    try {
      setSaving(true);

      await Promise.all([
        editCourse(group.id, cleanCourseCode, cleanCourseNumber),
        editLocation(group.id, cleanAddress, cleanRoom),
        editDate(group.id, new Date(`${date}T00:00`)),
        editTime(group.id, startDate, endDate),
        editMaxStudents(group.id, cleanMax),
        updateDoc(doc(db, "study_groups", group.id), {
          groupName: cleanName,
        }),
      ]);

      onSaved({
        groupName: cleanName,
        courseCode: cleanCourseCode,
        courseNumber: cleanCourseNumber,
        studyAddress: cleanAddress,
        studyRoom: cleanRoom,
        studyDate: new Date(`${date}T00:00`),
        studyTimeStart: startDate,
        studyTimeEnd: endDate,
        maxStudents: cleanMax,
      });
      onClose();
    } catch (error) {
      console.error("Failed to edit group:", error);
      alert("Failed to update group. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(26,22,16,.52)] px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="edit-group-scroll w-full max-w-[560px] max-h-[92vh] overflow-y-auto rounded-[34px] border border-[#ddd8cc] bg-[#faf8f4] p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-['Syne'] text-3xl font-black leading-none text-[#1a1610]">
              Edit Study Group
            </h2>
            <p className="mt-3 text-sm font-semibold text-[#9a9282]">
              Update the group info shown to members.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#ddd8cc] bg-[#edeae2] text-xl text-[#4a4438] transition hover:bg-[#faeade] hover:text-[#c96332]"
            aria-label="Close edit group modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className={labelCls}>Group Name</label>
            <input value={groupName} onChange={(e) => setGroupName(e.target.value)} className={inputCls} />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Course Code</label>
              <input value={courseCode} onChange={(e) => setCourseCode(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Course Number</label>
              <input value={courseNumber} onChange={(e) => setCourseNumber(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="mb-5">
            <label className={labelCls}>Room Location</label>
            <input placeholder="e.g. H-521" value={room} onChange={(e) => setRoom(e.target.value)} className={inputCls} />
          </div>

          <div className="mb-5">
            <label className={labelCls}>Physical Map Location</label>
            <input
              placeholder="e.g. Concordia University Hall Building, 1455 De Maisonneuve Blvd W"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Max Members</label>
              <input
                type="number"
                min="2"
                max="50"
                value={maxStudents}
                onChange={(e) => setMaxStudents(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Start Time</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>End Time</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-[10px] bg-[#edeae2] px-4 py-3.5 font-bold text-[#4a4438] transition hover:bg-[#e4e0d6] disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-[10px] bg-[#c96332] px-4 py-3.5 font-bold text-white transition hover:bg-[#a34e24] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
