import { useState } from "react";
import Button from "@/components/ui/Button";
import { signInWithGoogle } from "@/services/firebase/auth";
import { useNavigate } from "react-router-dom";

interface SignUpScreenProps {
  appName?: string;
  appTagline?: string;
  universityPlaceholder?: string;
  degreePlaceholder?: string;
}

export default function SignUpScreen({
  appName = "StudyHub",
  appTagline = "Your campus study network",
  universityPlaceholder = "Concordia University",
  degreePlaceholder = "Computer Engineering",
}: SignUpScreenProps) {
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSignIn = async () => {
    if (!university || !degree) {
      alert("Please fill in both university and degree fields.");
      setIsError(true);
      return;
    }
    setLoading(true);
    try {
      await signInWithGoogle({ university, degree })
    } catch(_) {
      alert("An error occurred during the sign-in process. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
    
    if (!loading && !isError) {
      navigate("/app");
    }
  }

  const onLogin = async () => {

    setLoading(true);
    try {
      await signInWithGoogle({ university, degree })
    } catch(_) {
      alert("An error occurred during the login process. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
    
    if (!loading && !isError) {
      navigate("/app");
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f2ede3] relative overflow-hidden px-5">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-80 bg-[#faeade] rounded-full blur-[70px] opacity-50 -top-24 -left-24"></div>
        <div className="absolute w-80 h-72 bg-[#e8edda] rounded-full blur-[70px] opacity-50 -bottom-20 -right-16"></div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-[390px] bg-[#faf8f4] border border-[#ddd8cc] rounded-[28px] p-9 sm:p-11 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-[#faeade] text-[#c96332] flex items-center justify-center font-black text-xl font-['Syne'] mb-5">
          SH
        </div>

        <div className="font-black text-4xl text-[#c96332] font-['Syne'] -tracking-0.5px mb-0.5">
          {appName}
        </div>
        <p className="text-sm text-[#9a9282] font-medium mb-8">
          {appTagline}
        </p>
        {/* University Field */}
        <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
          University
        </label>
        <input
          type="text"
          placeholder={universityPlaceholder}
          className={`w-full px-4 py-3 mb-4 bg-[#edeae2] border-2 rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all ${
            isError
              ? "border-[#e76f51] focus:border-[#d85c3f] focus:shadow-[0_0_0_3px_rgba(239,68,68,.1)]"
              : "border-[#ddd8cc] focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
          }`}
          value={university}
          onChange={(e) => {
            setUniversity(e.target.value)
            if (isError) setIsError(false)}}
        />

        {/* Degree Field */}
        <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
          Degree
        </label>
        <input
          type="text"
          placeholder={degreePlaceholder}
        className={`w-full px-4 py-3 mb-4 bg-[#edeae2] border-2 rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all ${
            isError
              ? "border-[#e76f51] focus:border-[#d85c3f] focus:shadow-[0_0_0_3px_rgba(239,68,68,.1)]"
              : "border-[#ddd8cc] focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
          }`}
          value={degree}
          onChange={(e) => {
            setDegree(e.target.value)
            if (isError) setIsError(false)}}
        />

        <div className="h-px bg-[#ddd8cc] mb-5" />

        {/* Google Sign Up Button */}
        <Button
          label="Sign Up with Google"
          onClick={onSignIn}
          variant="primary"
          size="lg"
          fullWidth
          className="mb-5"
          loading={loading}
        />

        <div className="text-center text-sm text-[#9a9282] font-medium">
          <p>
            Already have an account?
          </p>

          <div className="mt-2">
            <Button
              label="Log in with Google"
              onClick={onLogin}
              className="text-[#c96332] font-bold hover:underline"
              loading={loading}
              fullWidth
            />
          </div>
        </div>
      </div>
    </section>
  );
}
