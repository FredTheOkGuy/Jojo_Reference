import type { StudyGroup } from "../app/types";

export const INITIAL_GROUPS: StudyGroup[] = [
  {
    id: 0,
    name: "Algorithm Masters",
    course: "COMP 352",
    schoolName: "Concordia University",
    filterCode: "COMP",
    filterNum: "352",
    icon: "AL",
    gi: "gi-orange",
    cur: 7,
    max: 10,
    joined: true,
    isPrivate: false,
    joinRequested: false,

    location: "H-521",
    mapLocation:
      "Concordia University Hall Building, 1455 De Maisonneuve Blvd W, Montreal, QC",

    days: "Tuesday & Thursday",
    time: "5:00 PM – 7:00 PM",
    desc: "Working through algorithm design, complexity analysis, and exam prep.",
    badgeBg: "#faeade",
    badgeColor: "#c96332",
    members: [
      {
        i: "AJ",
        n: "Alice Johnson",
        r: "Concordia University",
        owner: true,
        c: "#c96332",
      },
      {
        i: "MB",
        n: "Marcus Brown",
        r: "Concordia University",
        owner: false,
        c: "#5a6e3a",
      },
      {
        i: "SP",
        n: "Sai Pagadala",
        r: "Concordia University",
        owner: false,
        c: "#3d5fa0",
      },
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
        text: "Almost there! Need to review recursion.",
        time: "2:48 PM",
      },
    ],
  },

  {
    id: 1,
    name: "Calculus Crew",
    course: "MATH 203",
    schoolName: "Concordia University",
    filterCode: "MATH",
    filterNum: "203",
    icon: "CA",
    gi: "gi-green",
    cur: 5,
    max: 8,
    joined: false,
    isPrivate: false,
    joinRequested: false,

    location: "LB-320",
    mapLocation:
      "Concordia University Webster Library, 1400 De Maisonneuve Blvd W, Montreal, QC",

    days: "Monday & Wednesday",
    time: "4:00 PM – 5:30 PM",
    desc: "Integration techniques, limits, derivatives, and calculus problem solving.",
    badgeBg: "#e8edda",
    badgeColor: "#5a6e3a",
    members: [
      {
        i: "RL",
        n: "Rocco Galette",
        r: "Concordia University",
        owner: true,
        c: "#5a6e3a",
      },
      {
        i: "MH",
        n: "Michelle Hart",
        r: "Concordia University",
        owner: false,
        c: "#7a4fa0",
      },
    ],
    docs: [{ n: "Integral_Rules.pdf", t: "pdf", s: "980 KB" }],
    messages: [],
  },

  {
    id: 2,
    name: "Computer Architecture Circle",
    course: "COEN 311",
    name: "Digital Systems Study",
    course: "COEN 244",
    schoolName: "Concordia University",
    filterCode: "COEN",
    filterNum: "311",
    icon: "CA",
    gi: "gi-purple",
    cur: 5,
    max: 8,
    joined: false,
    isPrivate: true,
    joinRequested: false,

    // FYI/custom room field
    location: "EV 2.160",

    // Real map-searchable location
    mapLocation:
      "Concordia University EV Building, 1515 St Catherine St W, Montreal, QC",

    days: "Thursday",
    time: "7:00 PM – 8:30 PM",
    desc: "Private review group for pipelines, memory hierarchy, and ISA basics.",
    location: "EV 1.210",
    mapLocation:
      "Concordia University EV Building, 1515 St Catherine St W, Montreal, QC",

    days: "Friday",
    time: "6:00 PM – 8:00 PM",
    desc: "Digital circuits, logic gates, Boolean algebra, and Verilog simulations.",
    badgeBg: "#ede0f7",
    badgeColor: "#7a4fa0",
    members: [
      {
        i: "HX",
        n: "Henson Xie",
        r: "Concordia University",
        owner: true,
        c: "#7a4fa0",
      },
      {
        i: "JP",
        n: "Joseph Palattao",
        r: "Concordia University",
        owner: false,
        c: "#c96332",
      },
    ],
    docs: [{ n: "Logic_Gates_Review.pdf", t: "pdf", s: "1.7 MB" }],
    messages: [],
  },

  {
    id: 3,
    name: "Physics Problem Solvers",
    course: "PHYS 205",
    schoolName: "Concordia University",
    filterCode: "PHYS",
    filterNum: "205",
    icon: "PH",
    gi: "gi-blue",
    cur: 4,
    max: 7,
    joined: false,

    location: "SP-S110",
    mapLocation:
      "Concordia University Science Pavilion, 7141 Sherbrooke St W, Montreal, QC",

    days: "Saturday",
    time: "1:00 PM – 3:00 PM",
    desc: "Mechanics review, forces, energy, momentum, and practice problems.",
    badgeBg: "#dde6f5",
    badgeColor: "#3d5fa0",
    members: [
      {
        i: "CN",
        n: "Carl Nasr",
        r: "Concordia University",
        owner: true,
        c: "#3d5fa0",
      },
      {
        i: "AM",
        n: "Amina Malik",
        r: "Concordia University",
        owner: false,
        c: "#5a6e3a",
      },
    ],
    docs: [{ n: "Forces_Practice.pdf", t: "pdf", s: "1.1 MB" }],
    messages: [],
  },

  {
    id: 4,
    name: "Software Engineering Sprint",
    course: "SOEN 341",
    schoolName: "Concordia University",
    filterCode: "SOEN",
    filterNum: "341",
    icon: "SE",
    gi: "gi-gold",
    cur: 8,
    max: 12,
    joined: false,

    location: "MB 3.255",
    mapLocation:
      "Concordia University John Molson Building, 1450 Guy St, Montreal, QC",

    days: "Tuesday",
    time: "3:30 PM – 5:30 PM",
    desc: "Agile workflows, frontend planning, GitHub issues, and project debugging.",
    badgeBg: "#f7edcc",
    badgeColor: "#8a6a1e",
    members: [
      {
        i: "LK",
        n: "Liam Kim",
        r: "Concordia University",
        owner: true,
        c: "#8a6a1e",
      },
      {
        i: "NS",
        n: "Nora Singh",
        r: "Concordia University",
        owner: false,
        c: "#c96332",
      },
    ],
    docs: [{ n: "Sprint_Checklist.docx", t: "docx", s: "650 KB" }],
    messages: [],
  },

  {
    id: 5,
    name: "Data Structures Lab",
    course: "COEN 352",
    schoolName: "Concordia University",
    filterCode: "COEN",
    filterNum: "352",
    icon: "DT",
    gi: "gi-orange",
    cur: 3,
    max: 6,
    joined: false,

    location: "H-837",
    mapLocation:
      "Concordia University Hall Building, 1455 De Maisonneuve Blvd W, Montreal, QC",

    days: "Thursday",
    time: "2:00 PM – 4:00 PM",
    desc: "Trees, hash tables, graphs, sorting algorithms, and assignment practice.",
    badgeBg: "#faeade",
    badgeColor: "#c96332",
    members: [
      {
        i: "YA",
        n: "Yusuf Ali",
        r: "Concordia University",
        owner: true,
        c: "#c96332",
      },
      {
        i: "EW",
        n: "Emma Wilson",
        r: "Concordia University",
        owner: false,
        c: "#3d5fa0",
      },
    ],
    docs: [{ n: "Graph_Algorithms.pdf", t: "pdf", s: "2.2 MB" }],
    messages: [],
  },

  {
    id: 6,
    name: "Embedded Systems Circle",
    course: "COEN 317",
    schoolName: "Concordia University",
    filterCode: "COEN",
    filterNum: "317",
    icon: "ES",
    gi: "gi-green",
    cur: 6,
    max: 9,
    joined: false,

    location: "EV 5.615",
    mapLocation:
      "Concordia University EV Building, 1515 St Catherine St W, Montreal, QC",

    days: "Monday",
    time: "6:30 PM – 8:30 PM",
    desc: "Microcontrollers, interrupts, timers, UART, I2C, SPI, and debugging embedded code.",
    badgeBg: "#e8edda",
    badgeColor: "#5a6e3a",
    members: [
      {
        i: "AR",
        n: "Ali Rizvi",
        r: "Concordia University",
        owner: true,
        c: "#5a6e3a",
      },
      {
        i: "KM",
        n: "Kareem Mansour",
        r: "Concordia University",
        owner: false,
        c: "#7a4fa0",
      },
    ],
    docs: [{ n: "UART_Timer_Notes.pdf", t: "pdf", s: "1.5 MB" }],
    messages: [],
  },

  {
    id: 7,
    name: "Machine Learning Beginners",
    course: "COEN 330",
    schoolName: "Concordia University",
    filterCode: "COEN",
    filterNum: "330",
    icon: "ML",
    gi: "gi-blue",
    cur: 9,
    max: 14,
    joined: false,

    location: "LB-205",
    mapLocation:
      "Concordia University Webster Library, 1400 De Maisonneuve Blvd W, Montreal, QC",

    days: "Wednesday",
    time: "5:30 PM – 7:30 PM",
    desc: "Python, NumPy, model training basics, classification, and machine learning concepts.",
    badgeBg: "#dde6f5",
    badgeColor: "#3d5fa0",
    members: [
      {
        i: "SR",
        n: "Sara Rahman",
        r: "Concordia University",
        owner: true,
        c: "#3d5fa0",
      },
      {
        i: "TN",
        n: "Theo Nguyen",
        r: "Concordia University",
        owner: false,
        c: "#c96332",
      },
    ],
    docs: [{ n: "ML_Intro_Slides.pptx", t: "pptx", s: "3.8 MB" }],
    messages: [],
  },

  {
    id: 8,
    name: "McGill Linear Algebra Hub",
    course: "MATH 133",
    schoolName: "McGill University",
    filterCode: "MATH",
    filterNum: "133",
    icon: "LA",
    gi: "gi-purple",
    cur: 4,
    max: 8,
    joined: false,

    location: "Burnside 1B24",
    mapLocation: "Burnside Hall, 805 Sherbrooke St W, Montreal, QC",

    days: "Sunday",
    time: "11:00 AM – 1:00 PM",
    desc: "Matrices, vector spaces, eigenvalues, transformations, and linear algebra review.",
    badgeBg: "#ede0f7",
    badgeColor: "#7a4fa0",
    members: [
      {
        i: "OD",
        n: "Olivia Davis",
        r: "McGill University",
        owner: true,
        c: "#7a4fa0",
      },
      {
        i: "JM",
        n: "Jacob Miller",
        r: "McGill University",
        owner: false,
        c: "#5a6e3a",
      },
    ],
    docs: [{ n: "Matrix_Practice.pdf", t: "pdf", s: "1.4 MB" }],
    messages: [],
  },

  {
    id: 9,
    name: "UdeM French Practice",
    course: "FRA 101",
    schoolName: "Université de Montréal",
    filterCode: "FRA",
    filterNum: "101",
    icon: "FR",
    gi: "gi-gold",
    cur: 5,
    max: 10,
    joined: false,

    location: "B-2245",
    mapLocation:
      "Université de Montréal, 2900 Edouard Montpetit Blvd, Montreal, QC",

    days: "Friday",
    time: "12:30 PM – 2:00 PM",
    desc: "Beginner French conversation practice, grammar basics, and speaking confidence.",
    badgeBg: "#f7edcc",
    badgeColor: "#8a6a1e",
    members: [
      {
        i: "CL",
        n: "Camille Laurent",
        r: "Université de Montréal",
        owner: true,
        c: "#8a6a1e",
      },
      {
        i: "RM",
        n: "Ryan Moore",
        r: "Université de Montréal",
        owner: false,
        c: "#3d5fa0",
      },
    ],
    docs: [{ n: "French_Basics.docx", t: "docx", s: "720 KB" }],
    messages: [],
  },
];

export const GI_COLORS_MAP: Record<string, { bg: string; text: string }> = {
  "gi-orange": { bg: "#faeade", text: "#c96332" },
  "gi-green": { bg: "#e8edda", text: "#5a6e3a" },
  "gi-blue": { bg: "#dde6f5", text: "#3d5fa0" },
  "gi-purple": { bg: "#ede0f7", text: "#7a4fa0" },
  "gi-gold": { bg: "#f7edcc", text: "#8a6a1e" },
};

export const CURRENT_USER = {
  initials: "AJ",
  name: "Alex Johnson",
  email: "alex.johnson@concordia.ca",
  school: "Concordia University",
};
