import Discord from "@/components/icons/discord/Discord";
import Github from "@/components/icons/github/Github";
import Twitter from "@/components/icons/Twitter/Twitter";
import Youtube from "@/components/icons/youtube/Youtube";
import CloudPlatform from "@/components/pages/Home/Notebook/CloudPlatform";
import Langflow from "@/components/pages/Home/Notebook/Langflow";
import Signup from "@/components/pages/Home/Notebook/Signup";
// Import all logo components
import Contact from "@/components/icons/contact/Contact";
import Linkedin from "@/components/icons/linkedin/Linkedin";
import Apple from "@/components/ui/icons/Apple";
import Athena from "@/components/ui/icons/Athena";
import ButterUp from "@/components/ui/icons/ButterUp";
import Ecclesiasical from "@/components/ui/icons/Ecclesiasical";
import Foqum from "@/components/ui/icons/Foqum";
import FyxtLogo from "@/components/ui/icons/Fyxt";
import Ik from "@/components/ui/icons/Ik";
import IntimeGDT from "@/components/ui/icons/IntimeGDT";
import PAP from "@/components/ui/icons/PAP";
import SurveyHub from "@/components/ui/icons/SurveyHub";
import Windows from "@/components/ui/icons/Windows";
import WinWeb from "@/components/ui/icons/WinWeb";

const LIST = [
  // {
  //   title: "Marketplace",
  //   link: "",
  //   icon: "/assets/icons/marketplace.svg",
  //   comingSoon: true,
  // },
  {
    title: "Docs",
    link: "http://docs.langflow.org/",
    icon: "/assets/icons/docs.svg",
    comingSoon: false,
  },
  {
    title: "Resources",
    link: "",
    icon: "/assets/icons/resources.svg",
    comingSoon: false,
    subTabs: [
      {
        title: "Changelog",
        url: "https://github.com/langflow-ai/langflow/releases",
        icon: null,
        download: false,
      },
      {
        title: "Blog",
        url: "/blog",
        icon: null,
        download: false,
      },
      {
        title: "Newsletter",
        url: "/newsletter",
        icon: null,
        download: false,
      },
      {
        title: "Events",
        url: "/events",
        icon: null,
        download: false,
      },
      {
        title: "Podcast",
        url: "/podcast",
        icon: null,
        download: false,
      },
      {
        title: "Brand Kit",
        url: "/brandkit/brandkit.zip",
        icon: null,
        download: true,
      },
    ],
  },
  {
    title: "Community",
    link: "",
    icon: "/assets/icons/community.svg",
    comingSoon: false,
    subTabs: [
      {
        title: "Contact us",
        url: "mailto:contact@langflow.org",
        icon: <Contact size="22" />,
        download: false,
      },
      {
        title: "GitHub",
        url: "https://bit.ly/langflow",
        icon: <Github size="22" />,
        download: false,
      },
      {
        title: "Discord",
        url: "https://discord.gg/EqksyE2EX9",
        icon: <Discord size="22" />,
        download: false,
      },
      {
        title: "X",
        url: "https://x.com/langflow_ai",
        icon: <Twitter size="22" />,
        download: false,
      },
      {
        title: "YouTube",
        url: "https://www.youtube.com/@Langflow",
        icon: <Youtube size="22" />,
        download: false,
      },
      {
        title: "LinkedIn",
        url: "https://www.linkedin.com/company/langflow/",
        icon: <Linkedin size="22" />,
        download: false,
      },
    ],
  },
  {
    title: "Partners",
    link: "/partners",
    icon: "",
    comingSoon: false,
  },
  {
    title: "Download",
    link: "/desktop",
    icon: "",
    comingSoon: false,
  },
];

const SOCIALS = [
  {
    icon: <Github />,
    count: "73k",
    url: "https://github.com/langflow-ai/langflow",
    platform: "github",
  },
  {
    icon: <Discord />,
    count: "18k",
    url: "https://discord.com/invite/EqksyE2EX9",
    platform: "discord",
  },
  {
    icon: <Twitter />,
    count: "10k",
    url: "https://x.com/langflow_ai",
    platform: "x",
  },
  {
    icon: <Youtube />,
    count: "11k",
    url: "https://www.youtube.com/@Langflow",
    platform: "youtube",
  },
];

const QUOTES_DATA = [
  {
    quote:
      "Langflow lets us take complex product ideas and quickly bring them to life through visual flows that anyone can understand.",
    authorName: "Jonathan Blomgren",
    authorTitle: "Studios Director, BetterUp",
    authorImage: "/images/Coo_2.png",
    icon: <ButterUp />,
  },
  {
    quote:
      "Langflow has transformed our RAG application development, letting us focus more on creativity and less on complexity.",
    authorName: "Jan Schummers",
    authorTitle: "Sr. Software Engineer, WinWeb",
    authorImage: "/images/Coo_3.png",
    icon: <WinWeb />,
  },
  {
    quote:
      "Langflow has completely transformed the way we iterate and deploy AI workflows.",
    authorName: "Brendon Geils",
    authorTitle: "CEO, Athena Intelligence",
    authorImage: "/images/Coo.png",
  },
];
const HERO_CONTENT = {
  title: "Stop fighting your tools",
  description:
    "Langflow is a powerful tool to build and deploy AI agents and MCP servers. It comes with batteries included and supports all major LLMs, vector databases and a growing library of AI tools.",
  image: {
    src: "/images/Gradient.png",
    alt: "gradient",
    fill: true,
    priority: true,
  },
  buttons: {
    primary: {
      label: "Get Started for Free",
      link: "/desktop",
    },
    secondary: {
      label: "Star on GitHub",
      link: "https://github.com/langflow-ai/langflow",
    },
  },
};
const NOTEBOOK = {
  title: "From Notebook to Production",
  description:
    "Getting your AI in front of real users shouldn’t be a headache.",
};

const CARDS = [
  {
    text: "Deploy yourself or sign up for a free cloud account",
    Component: Signup,
    background: true,
    image: "/images/card-1.png",
  },
  {
    text: "Deploy and scale on an enterprise-grade, secure cloud platform",
    Component: CloudPlatform,
    background: false,
    image: "/images/card-2.png",
  },
  {
    text: "Same Langflow whether you’re using OSS or Cloud",
    Component: Langflow,
    background: false,
    image: "/images/card-3.png",
  },
];
const PARTNERS_STACK_TEXT = {
  title: "Connect your existing tools",
  description:
    "Choose from hundreds of data sources, models, or vector stores. If you don’t find what you’re looking for, build your own custom component.",
};
const STACK_TEXT = {
  heading: "Used by leading AI development teams",
};
const STACK_LOGOS = [
  FyxtLogo,
  SurveyHub,
  Athena,
  Ecclesiasical,
  Ik,
  Foqum,
  PAP,
  IntimeGDT,
];
const GET_STARTED = {
  title: "Create your first flow",
  description:
    "Join thousands of developers accelerating their AI workflows. Start your first Langflow project now.",
  buttons: {
    primary: {
      label: "Get Started for Free",
      link: "/desktop",
    },
    secondary: {
      label: "Star on GitHub",
      link: "https://github.com/langflow-ai/langflow",
    },
  },
  image: {
    src: "/images/getStarted.png",
    alt: "gradiant",
    onClick: () => {
      console.log("Image clicked");
    },
  },
};

const DOWNLOAD_OPTIONS = [
  {
    icon: <Apple />,
    name: "macOS (Apple Silicon)",
    link: "https://github.com/langflow-ai/langflow/releases/download/1.5.0.post1/Langflow_1.5.1_aarch64.dmg",
    fileName: "Langflow_1.5.1_aarch64.dmg",
    btnText: "Download",
    isComingSoon: false,
  },
  {
    icon: <Apple />,
    name: "macOS (Intel)",
    link: "https://github.com/langflow-ai/langflow/releases/download/1.5.0.post1/Langflow_1.5.1_x86_64.dmg",
    fileName: "Langflow_1.5.1_x86_64.dmg",
    btnText: "Download",
    isComingSoon: false,
  },
  {
    icon: <Windows />,
    name: "Windows (x64)",
    link: "https://github.com/langflow-ai/langflow/releases/download/1.5.0.post1/Langflow_1.5.1_x64_en-US.msi",
    fileName: "Langflow_1.5.1_x64_en-US.msi",
    btnText: "Download",
    isComingSoon: false,
  },
  {
    icon: <Windows />,
    name: "Windows (Arm)",
    link: "/",
    fileName: "",
    btnText: "",
    isComingSoon: true,
  },
  // {
  //   icon: <Globe />,
  //   name: "Web app",
  //   link: "https://github.com/langflow-ai/langflow/releases/download/1.4.2/Langflow_aarch64.dmg",
  //   fileName: "",
  //   btnText: "Open",
  //   isComingSoon: true,
  // },
];

export {
    CARDS, DOWNLOAD_OPTIONS, GET_STARTED, HERO_CONTENT, LIST, NOTEBOOK, PARTNERS_STACK_TEXT, QUOTES_DATA, SOCIALS, STACK_LOGOS, STACK_TEXT
};

