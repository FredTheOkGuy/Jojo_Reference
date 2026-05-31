// This file contains all hardcoded data
// Replace this with API/database calls later

import type { StudyGroup } from "../app/StudyHubApp";

export const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: 0,
    name: "Algorithm Masters",
    course: "COMP 352",
    icon: "AL",
    gi: "gi-orange",
    cur: 7,
    max: 10,
    joined: true,
    location: "Hall Building H-521",
    days: "Tuesday & Thursday",
    time: "5:00 PM – 7:00 PM",
    desc: "Working through algorithm design, complexity analysis, and exam prep.",
    badgeBg: "#faeade",
    badgeColor: "#c96332",
    members: [
      { i: "AJ", n: "Alice Johnson", r: "Host", owner: true, c: "#c96332" },
      { i: "MB", n: "Marcus Brown", r: "Member", owner: false, c: "#5a6e3a" },
    ],
    docs: [
      { n: "Algo_Notes.pdf", t: "pdf", s: "2.4 MB" },
      { n: "Practice_Set.docx", t: "docx", s: "1.2 MB" },
    ],
    messages: [
      {
        sender: "AJ",
        senderFull: "Alice",
        mine: true,
        c: "#c96332",
        text: "Hey, ready for the test?",
        time: "2:45 PM",
      },
      {
        sender: "MB",
        senderFull: "Marcus",
        mine: false,
        c: "#5a6e3a",
        text: "Almost there! Need to review recursion",
        time: "2:48 PM",
      },
    ],
  },
  {
    id: 1,
    name: "Calculus Crew",
    course: "MATH 203",
    icon: "CA",
    gi: "gi-green",
    cur: 5,
    max: 8,
    joined: false,
    location: "Library LB 320",
    days: "Monday & Wednesday",
    time: "4:00 PM – 5:30 PM",
    desc: "Integration techniques and calculus problem solving.",
    badgeBg: "#e8edda",
    badgeColor: "#5a6e3a",
    members: [],
    docs: [],
    messages: [],
  },
  {
    id: 2,
    name: "Digital Systems Study",
    course: "COEN 244",
    icon: "DS",
    gi: "gi-purple",
    cur: 6,
    max: 10,
    joined: false,
    location: "EV 1.210",
    days: "Friday",
    time: "6:00 PM – 8:00 PM",
    desc: "Digital circuits, logic gates, and Verilog simulations.",
    badgeBg: "#ede0f7",
    badgeColor: "#7a4fa0",
    members: [],
    docs: [],
    messages: [],
  },
];

// Color map - can be imported and reused everywhere
export const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  "gi-orange": { bg: "#faeade", text: "#c96332" },
  "gi-green": { bg: "#e8edda", text: "#5a6e3a" },
  "gi-blue": { bg: "#dde6f5", text: "#3d5fa0" },
  "gi-purple": { bg: "#ede0f7", text: "#7a4fa0" },
  "gi-gold": { bg: "#f7edcc", text: "#8a6a1e" },
};

// User profile data - can be replaced with real user data
export const CURRENT_USER = {
  initials: "AJ",
  name: "Alex Johnson",
  email: "alex.johnson@concordia.ca",
  school: "Concordia University",
};
