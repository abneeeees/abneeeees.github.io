export interface SocialLink {
  /** Font Awesome icon class (e.g. "fa-brands fa-github") */
  icon: string;
  href: string;
  label: string;
  /** Open in a new tab with rel="noopener" */
  external?: boolean;
}

/** Links shown under the hero heading. */
export const heroLinks: SocialLink[] = [
  {
    icon: "fa-brands fa-github",
    href: "https://github.com/abneeeees",
    label: "GitHub",
    external: true,
  },
  {
    icon: "fab fa-twitter",
    href: "https://x.com/abneeeees",
    label: "Twitter",
    external: true,
  },
  {
    icon: "fab fa-linkedin",
    href: "https://www.linkedin.com/in/abneeeees/",
    label: "Linkedin",
    external: true,
  },
  {
    icon: "fab fa-instagram",
    href: "https://instagram.com/abneeeees",
    label: "Instagram",
    external: true,
  },
  {
    icon: "fa-brands fa-reddit-alien",
    href: "https://reddit.com/u/abneeeees",
    label: "Reddit",
    external: true,
  },
  {
    icon: "fa-solid fa-envelope",
    href: "mailto:abneeeees@proton.me",
    label: "Email",
  },
];

/** Links shown in the contact section. */
export const contactLinks: SocialLink[] = [
  {
    icon: "fa-brands fa-github",
    href: "https://github.com/abneeeees",
    label: "GitHub",
    external: true,
  },
  {
    icon: "fab fa-twitter",
    href: "https://x.com/abneeeees",
    label: "Twitter",
    external: true,
  },
  {
    icon: "fab fa-linkedin",
    href: "https://www.linkedin.com/in/abneeeees/",
    label: "Linkedin",
    external: true,
  },
  {
    icon: "fab fa-instagram",
    href: "https://instagram.com/abneeeees",
    label: "Instagram",
    external: true,
  },
  {
    icon: "fa-brands fa-telegram",
    href: "https://t.me/abneeeees",
    label: "Telegram",
    external: true,
  },
  {
    icon: "fa-solid fa-envelope",
    href: "mailto:abneeeees@proton.me",
    label: "Email",
  },
  {
    icon: "fa-brands fa-reddit-alien",
    href: "https://reddit.com/u/abneeeees",
    label: "Reddit",
    external: true,
  },
  {
    icon: "fa-solid fa-code",
    href: "https://leetcode.com/u/Avneesh-Kumar/",
    label: "Leetcode",
    external: true,
  },
  {
    icon: "fa-solid fa-palette",
    href: "https://abneeeees.me",
    label: "Art-Portfolio",
    external: true,
  },
];
