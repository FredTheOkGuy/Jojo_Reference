import { useAuth } from '@/hooks/useAuth';
import { createStudyGroup, generateStudyGuide, uploadDocument } from '@/queries/study_group';
import { db } from '@/services/firebase/firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateGroupModal({ open, onClose, onCreated }: CreateGroupModalProps) {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [number, setNumber] = useState('');
  const [room, setRoom] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('19:00');
  const [maxStudents, setMaxStudents] = useState('8');
  const [isPrivate, setIsPrivate] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [chapters, setChapters] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    const creatorName = user.displayName ?? user.email ?? user.uid;
    const startDate = new Date(`${date}T${startTime}`);
    const endDate = new Date(`${date}T${endTime}`);

    try {
      setSubmitStatus('Creating group…');
      const groupId = await createStudyGroup(
        name || 'New Study Group',
        code.toUpperCase() || 'MISC',
        number || '000',
        creatorName,
        address || 'Concordia University, Montreal, QC',
        room || 'TBD',
        new Date(date),
        startDate,
        endDate,
        parseInt(maxStudents) || 8,
        isPrivate
      );

      await updateDoc(doc(db, 'users', user.uid), {
        groupIds: arrayUnion(groupId),
      });

      if (file) {
        setSubmitStatus('Uploading document…');
        await uploadDocument(groupId, file, creatorName);

        setSubmitStatus('Generating study guide with AI…');
        await generateStudyGuide(file, startDate, endDate, chapters || 'All chapters', groupId);
      }

      setName(''); setCode(''); setNumber(''); setRoom(''); setAddress('');
      setDate(''); setStartTime('17:00'); setEndTime('19:00'); setMaxStudents('8');
      setIsPrivate(false); setFile(null); setChapters(''); setSubmitStatus('');

      onCreated?.();
      onClose();
    } catch (err) {
      console.error('Failed to create group:', err);
      alert('Failed to create group. Please try again.');
      setSubmitStatus('');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const inputCls = "w-full px-4 py-3 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]";
  const labelCls = "block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5";

  return (
    <div className="fixed inset-0 bg-[rgba(26,22,16,.5)] z-50 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#faf8f4] border border-[#ddd8cc] rounded-3xl p-7 w-96 max-w-[94vw] shadow-xl max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <span className="font-black text-2xl text-[#1a1610] font-['Syne']">Create Study Group</span>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-[#edeae2] border border-[#ddd8cc] text-[#4a4438] cursor-pointer text-sm font-bold flex items-center justify-center transition-all hover:bg-[#faeade] hover:text-[#c96332]">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={labelCls}>Group Name</label>
            <input type="text" placeholder="e.g. Signals & Systems Team" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </div>

          <div className="flex gap-2.5 mb-4">
            <div className="flex-1">
              <label className={labelCls}>Course Code</label>
              <input type="text" placeholder="COEN" value={code} onChange={(e) => setCode(e.target.value)} className={inputCls} />
            </div>
            <div className="flex-1">
              <label className={labelCls}>Course Number</label>
              <input type="text" placeholder="244" value={number} onChange={(e) => setNumber(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelCls}>Room</label>
            <input type="text" placeholder="e.g. LB 520" value={room} onChange={(e) => setRoom(e.target.value)} className={inputCls} />
          </div>

          <div className="mb-4">
            <label className={labelCls}>Address (for map)</label>
            <input type="text" placeholder="e.g. Webster Library, 1400 De Maisonneuve Blvd W" value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} />
          </div>

          <div className="mb-4">
            <label className={labelCls}>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={inputCls} />
          </div>

          <div className="flex gap-2.5 mb-4">
            <div className="flex-1">
              <label className={labelCls}>Start Time</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className={inputCls} />
            </div>
            <div className="flex-1">
              <label className={labelCls}>End Time</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelCls}>Max Members</label>
            <input type="number" min="2" max="30" value={maxStudents} onChange={(e) => setMaxStudents(e.target.value)} className={inputCls} />
          </div>

          <label className="flex items-center gap-2.5 mb-5 cursor-pointer">
            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} className="w-4 h-4 accent-[#c96332]" />
            <span className="text-sm font-medium text-[#4a4438]">Private group (members must request to join)</span>
          </label>

          <div className="h-px bg-[#ddd8cc] mb-5" />

          <div className="mb-4">
            <label className={labelCls}>Study Material (optional)</label>
            <label className="flex items-center gap-3 px-4 py-3 bg-[#edeae2] border-2 border-dashed border-[#ddd8cc] rounded-[9px] cursor-pointer transition-all hover:border-[#c96332] hover:bg-[#faf8f4]">
              <span className="text-lg">📄</span>
              <span className="text-sm font-medium text-[#4a4438] flex-1 truncate">
                {file ? file.name : 'Upload PDF, DOCX, or PPTX…'}
              </span>
              {file && (
                <button type="button" onClick={(e) => { e.preventDefault(); setFile(null); }} className="text-xs text-[#9a9282] hover:text-[#c96332] font-bold">✕</button>
              )}
              <input type="file" accept=".pdf,.docx,.pptx,application/pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
            <p className="text-xs text-[#9a9282] mt-1.5 font-medium">A study guide will be auto-generated with AI when you upload a file.</p>
          </div>

          {file && (
            <div className="mb-5">
              <label className={labelCls}>Chapters / Topics to focus on</label>
              <input type="text" placeholder="e.g. Chapter 3, 4 — Recursion and Sorting" value={chapters} onChange={(e) => setChapters(e.target.value)} className={inputCls} />
            </div>
          )}

          <button type="submit" disabled={submitting} className="w-full py-3.5 bg-[#c96332] text-white font-bold rounded-[9px] transition-all hover:bg-[#a34e24] active:scale-95 hover:shadow-lg disabled:opacity-60">
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {submitStatus || 'Creating…'}
              </span>
            ) : 'Create Group →'}
          </button>
        </form>
      </div>
    </div>
  );
}