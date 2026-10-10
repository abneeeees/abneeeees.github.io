export interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
}

export const projects: Project[] = [
  {
    title: "Magnetio",
    description:
      "A decentralised music streaming platform based on Bittorent Architecture",
    tags: ["Next.js", "Bitorrent Architecture", "#working"],
    url: "https://github.com/abneeeees/Magnetio",
  },
  {
    title: "OMenu",
    description:
      "A fast, GTA-inspired radial menu and application launcher built for Wayland compositors",
    tags: ["Gtk Application", "pycario"],
    url: "https://github.com/abneeeees/OMenu",
  },
  {
    title: "DeepThrottle",
    description:
      "A rate limiting library for HTTP APIs built with FastAPI. Supports multiple rate limiting algorithms that can be swapped via configuration.",
    tags: ["Token Bucket", "Sliding window Counter", "Leaky Bucket"],
    url: "https://github.com/abneeeees/Deck-Of-Wars",
  },
  {
    title: "PewPew",
    description: "Social Media for Gamers.",
    tags: ["Next.js", "OAuth2", "pgSQL"],
    url: "https://github.com/abneeeees/PewPew",
  },
  {
    title: "ablist",
    description:
      "Bruteforcing tool, that generates custom wordlists from a given set of words.",
    tags: ["Python", "uvicorn", "Bruteforce"],
    url: "https://github.com/abneeeees/ablist",
  },
  {
    title: "Maas Kalab",
    description:
      "A very serious website for very unserious meat activities.",
    tags: ["TypeScript", "Nextjs", "Tailwind CSS"],
    url: "https://github.com/abneeeees/Maas-Kalab",
  },
  {
    title: "Skull Shell",
    description: "A lightweight shell implementation written in C.",
    tags: ["C", "System Processes"],
    url: "https://github.com/abneeeees/SKULL-SHELL",
  },
  {
    title: "Github Analyzer",
    description:
      "ML-based GitHub repo analyzer I built while learning machine learning.",
    tags: ["Python", "Web Scrapping"],
    url: "https://github.com/abneeeees/Github-Analyzer",
  },
  {
    title: "FUshut_down",
    description: "A tool that does exactly what the name implies.",
    tags: ["Python", "cv", "mediapipe"],
    url: "https://github.com/abneeeees/FUshut_down",
  },
  {
    title: "Morse Code Convertor",
    description:
      "This is a Python program that translates English text to Morse code and vice versa.",
    tags: ["Python", "pygame"],
    url: "https://github.com/abneeeees/Morse-code-convertor",
  },
  {
    title: "Nmap Scanner",
    description: "scans a ip address and provides other informations.",
    tags: ["Shell", "Python", "nmap", "port scanning"],
    url: "https://github.com/abneeeees/Nmap-scanner",
  },
];
