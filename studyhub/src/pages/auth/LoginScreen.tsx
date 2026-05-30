interface LoginScreenProps {
  onSignIn: () => void;
}

export default function LoginScreen({ onSignIn }: LoginScreenProps) {
  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f2ede3] relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-80 bg-[#faeade] rounded-full blur-[70px] opacity-50 -top-24 -left-24"></div>
        <div className="absolute w-80 h-72 bg-[#e8edda] rounded-full blur-[70px] opacity-50 -bottom-20 -right-16"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-96 bg-[#faf8f4] border border-[#ddd8cc] rounded-5xl p-11 shadow-xl">
        <div className="font-black text-4xl text-[#c96332] font-['Syne'] -tracking-0.5px mb-0.5">
          StudyHub
        </div>
        <p className="text-sm text-[#9a9282] font-medium mb-8">
          Your campus study network
        </p>

        {/* Email Field */}
        <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
          Email
        </label>
        <input
          type="email"
          placeholder="you@concordia.ca"
          className="w-full px-4 py-3 mb-4 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
        />

        {/* Password Field */}
        <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-3 mb-4 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
        />

        {/* Sign In Button */}
        <button
          onClick={onSignIn}
          className="w-full py-3.5 bg-[#c96332] text-white font-bold rounded-[9px] transition-all hover:bg-[#a34e24] active:scale-95 hover:shadow-lg"
        >
          Sign in →
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#ddd8cc]"></div>
          <span className="text-xs text-[#9a9282] font-semibold">or</span>
          <div className="flex-1 h-px bg-[#ddd8cc]"></div>
        </div>

        {/* Google Button */}
        <button className="w-full py-3 bg-[#faf8f4] text-[#4a4438] font-semibold text-sm border-2 border-[#ddd8cc] rounded-[9px] transition-all hover:border-[#c96332] hover:text-[#c96332]">
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-[#9a9282] font-medium">
          No account?{" "}
          <button
            onClick={onSignIn}
            className="text-[#c96332] font-bold hover:underline"
          >
            Sign up free
          </button>
        </p>
      </div>
    </section>
  );
}
