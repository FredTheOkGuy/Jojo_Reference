export const colors = {
  background: "#f2ede3",
  surface: "#faf8f4",
  surface2: "#edeae2",
  surface3: "#e4e0d6",

  primary: "#c96332",
  primaryLite: "#faeade",
  primaryMedium: "#f0b897",
  primaryDark: "#a34e24",

  accent: "#5a6e3a",
  accentLite: "#e8edda",

  accent2: "#3d5fa0",
  accent2Lite: "#dde6f5",

  accent3: "#7a4fa0",
  accent3Lite: "#ede0f7",

  accent4: "#8a6a1e",
  accent4Lite: "#f7edcc",

  ink: "#1a1610",
  ink2: "#4a4438",
  ink3: "#9a9282",

  border: "#ddd8cc",
  border2: "#cec8bc",
} as const

export type ColorKey = keyof typeof colors