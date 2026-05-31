import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Button from "../../components/ui/Button";

interface LoginScreenProps {
  onSignIn: () => void;
  appName?: string;
  appTagline?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  universityPlaceholder?: string;
  degreePlaceholder?: string;
}

const inputClass =
  "w-full px-4 py-3 mb-4 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]";

const formVariants: Variants = {
  hidden: { opacity: 0, x: 18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, x: -18, transition: { duration: 0.18 } },
};

export default function LoginScreen({
  onSignIn,
  appName = "StudyHub",
  appTagline = "Your campus study network",
  emailPlaceholder = "you@concordia.ca",
  passwordPlaceholder = "••••••••",
  universityPlaceholder = "Concordia University",
  degreePlaceholder = "Computer Engineering",
}: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#f2ede3] relative overflow-hidden px-5">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 28, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-96 h-80 bg-[#faeade] rounded-full blur-[70px] opacity-60 -top-24 -left-24"
        />
        <motion.div
          animate={{ x: [0, -24, 0], y: [0, -22, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-80 h-72 bg-[#e8edda] rounded-full blur-[70px] opacity-60 -bottom-20 -right-16"
        />
        <motion.div
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.12, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-52 h-52 bg-[#dde6f5] rounded-full blur-[60px] opacity-30 top-1/3 right-1/4"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 23 }}
        className="relative z-10 w-full max-w-[390px] bg-[#faf8f4] border border-[#ddd8cc] rounded-[28px] p-9 sm:p-11 shadow-xl"
      >
        <motion.div
          initial={{ rotate: -8, scale: 0.86 }}
          animate={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: -4, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="w-14 h-14 rounded-2xl bg-[#faeade] text-[#c96332] flex items-center justify-center font-black text-xl font-['Syne'] mb-5"
        >
          SH
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-black text-4xl text-[#c96332] font-['Syne'] -tracking-0.5px mb-0.5"
        >
          {appName}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="text-sm text-[#9a9282] font-medium mb-8"
        >
          {isSignUp ? "Create your campus study profile" : appTagline}
        </motion.p>

        <AnimatePresence mode="wait">
          {isSignUp ? (
            <motion.div key="signup" variants={formVariants} initial="hidden" animate="show" exit="exit">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                University
              </label>
              <motion.input
                whileFocus={{ scale: 1.015 }}
                type="text"
                placeholder={universityPlaceholder}
                className={inputClass}
              />

              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Degree
              </label>
              <motion.input
                whileFocus={{ scale: 1.015 }}
                type="text"
                placeholder={degreePlaceholder}
                className="w-full px-4 py-3 mb-7 bg-[#edeae2] border-2 border-[#ddd8cc] rounded-[9px] text-[#1a1610] text-sm font-medium outline-none transition-all focus:border-[#c96332] focus:shadow-[0_0_0_3px_rgba(201,99,50,.1)]"
              />

              <div className="h-px bg-[#ddd8cc] mb-5" />

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  label="Sign Up with Google"
                  onClick={onSignIn}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="mb-5"
                />
              </motion.div>

              <p className="text-center text-sm text-[#9a9282] font-medium">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-[#c96332] font-bold hover:underline"
                >
                  Log in
                </button>
              </p>
            </motion.div>
          ) : (
            <motion.div key="login" variants={formVariants} initial="hidden" animate="show" exit="exit">
              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.015 }}
                type="email"
                placeholder={emailPlaceholder}
                className={inputClass}
              />

              <label className="block text-xs font-bold uppercase tracking-wide text-[#4a4438] mb-1.5">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.015 }}
                type="password"
                placeholder={passwordPlaceholder}
                className={inputClass}
              />

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  label="Sign in →"
                  onClick={onSignIn}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="mb-5"
                />
              </motion.div>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-[#ddd8cc]"></div>
                <span className="text-xs text-[#9a9282] font-semibold">or</span>
                <div className="flex-1 h-px bg-[#ddd8cc]"></div>
              </div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Button
                  label="Continue with Google"
                  onClick={() => {}}
                  variant="secondary"
                  size="md"
                  fullWidth
                  className="mb-6"
                />
              </motion.div>

              <p className="text-center text-sm text-[#9a9282] font-medium">
                No account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-[#c96332] font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
