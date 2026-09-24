export interface ProjectItem {
  id: string;
  title: string;
  category: "social" | "motion" | "commercial" | "events";
  categoryLabel: string;
  client: string;
  year: string;
  duration: string;
  description: string;
  videoUrl: string;
  posterGradient: string;
  tags: string[];
  role: string;
  aspect?: "portrait" | "landscape";
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  highlight: string;
  deliverables: string[];
}

export interface StatItem {
  value: string;
  numeric: number;
  suffix: string;
  label: string;
  description: string;
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://shahanhassan.vercel.app";

export const portfolioData = {
  personal: {
    name: "Shahan Hassan",
    role: "Video Editor & Motion Designer",
    badge: "Available for Commissions",
    tagline: "Short-Form Content · Motion Graphics · DaVinci Resolve & After Effects Mastery",
    bio: "Specializing in high-retention short-form content, kinetic motion design, and precision color grading using DaVinci Resolve and Adobe After Effects.",
    location: "Kerala, India / Remote",
    status: "Accepting select commercial & creator projects",
  },

  socials: {
    instagram: "https://www.instagram.com/shahnn.5/",
    youtube: "",
    whatsapp: "https://wa.me/919074310917",
    email: "shahanhassankt@gmail.com",
  },

  navigation: [
    { label: "Showreel", href: "#reel" },
    { label: "Works", href: "#works" },
    { label: "Method", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],

  heroReel: {
    title: "Grand Corporate Inauguration",
    subtitle: "Multi-camera architectural coverage and executive commercial cut with high-energy cinematic pacing.",
    videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258357/inauguration_edit.mp4",
    aspectRatio: "16/9",
    duration: "00:45",
  },

  stats: [
    {
      value: "20+",
      numeric: 20,
      suffix: "+",
      label: "Delivered Projects",
      description: "Short-form reels, commercial cuts, motion graphics",
    },
    {
      value: "100K+",
      numeric: 100,
      suffix: "K+",
      label: "Digital Reach",
      description: "Organic views across Instagram Reels & creator channels",
    },
    {
      value: "3+",
      numeric: 3,
      suffix: "+",
      label: "Years in Post-Production",
      description: "Crafting tempo, After Effects motion & DaVinci grades",
    },
    {
      value: "100%",
      numeric: 100,
      suffix: "%",
      label: "On-Time Delivery",
      description: "Strict milestone adherence from assembly to master",
    },
  ] as StatItem[],

  categories: [
    { id: "all", label: "All Works" },
    { id: "social", label: "Social & Kinetic Reels" },
    { id: "motion", label: "Motion Graphics & VFX" },
    { id: "commercial", label: "Commercial & Promo" },
    { id: "events", label: "Cinematic & Events" },
  ] as const,

  projects: [
    {
      id: "corporate-inauguration-cut",
      title: "Grand Corporate Inauguration",
      category: "commercial",
      categoryLabel: "Commercial Event",
      client: "Corporate Event",
      year: "2025",
      duration: "00:45",
      description:
        "Multi-camera architectural and executive event recap capturing ribbon-cutting, keynote moments, and prestige brand presence.",
      videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258357/inauguration_edit.mp4",
      posterGradient: "from-[#070607] via-[#1a1715] to-[#2d1204]",
      tags: ["Corporate Event", "Multi-cam", "Executive Cut", "16:9 Landscape"],
      role: "Lead Editor & Colorist",
      aspect: "landscape",
    },
    {
      id: "talking-head-car-speed-ramp",
      title: "Automotive & Speed Ramping Edit",
      category: "social",
      categoryLabel: "Kinetic Reel",
      client: "Automotive & Creator Reel",
      year: "2025",
      duration: "00:30",
      description:
        "High-octane talking head integration paired with precision car speed ramping, sound design hits, and retention-focused pacing.",
      videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258291/Talking_head_style_car_speed_ramping_style_edit.mp4",
      posterGradient: "from-[#1a082e] via-[#070607] to-[#2a0e02]",
      tags: ["Speed Ramps", "Talking Head", "Sound FX", "9:16 Vertical"],
      role: "Editor & Sound Designer",
      aspect: "portrait",
    },
    {
      id: "text-animation-edit",
      title: "Kinetic Typography & Text Animation",
      category: "motion",
      categoryLabel: "Motion Graphics",
      client: "Motion Typography",
      year: "2025",
      duration: "00:25",
      description:
        "Dynamic title animation and kinetic typography engineered for maximum viewer retention, visual impact, and brand recall.",
      videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258269/Text_animation_edit.mp4",
      posterGradient: "from-[#200b02] via-[#070607] to-[#150624]",
      tags: ["Kinetic Typography", "After Effects", "Beat Sync", "9:16 Vertical"],
      role: "Motion Designer & Editor",
      aspect: "portrait",
    },
    {
      id: "photo-to-video-edit",
      title: "2.5D Parallax: Photo to Video",
      category: "motion",
      categoryLabel: "VFX & Animation",
      client: "Photo-to-Video Animation",
      year: "2024",
      duration: "00:20",
      description:
        "Transforming static photography into dynamic dimensional cinematography using 2.5D depth mapping, particle atmospheres, and camera projection in After Effects.",
      videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258352/Photo_to_video_edit.mp4",
      posterGradient: "from-[#110e38] via-[#070607] to-[#250d03]",
      tags: ["Photo to Video", "2.5D Parallax", "Depth Mapping", "After Effects"],
      role: "VFX Artist & Animator",
      aspect: "portrait",
    },
    {
      id: "engagement-cinematic-film",
      title: "Golden Hour Engagement Story",
      category: "events",
      categoryLabel: "Cinematic Event",
      client: "Wedding & Engagement Story",
      year: "2025",
      duration: "01:00",
      description:
        "Intimate, warm-toned romantic narrative cut with soft halation, emotional pacing, golden hour color grading, and acoustic audio design.",
      videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258327/engagement_edit.mp4",
      posterGradient: "from-[#181716] via-[#070607] to-[#241005]",
      tags: ["Cinematic Event", "DaVinci Color", "Emotional Pacing", "Film Emulation"],
      role: "Editor & Colorist",
      aspect: "portrait",
    },
    {
      id: "onam-celebration-recap",
      title: "Onam Cultural Celebration Highlights",
      category: "events",
      categoryLabel: "Festival Recap",
      client: "Cultural Festival Film",
      year: "2024",
      duration: "00:45",
      description:
        "High-energy festive event film blending traditional beats, vibrant color grading, dynamic transition cuts, and joyous community moments.",
      videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258361/Onam_celebration_edit.mp4",
      posterGradient: "from-[#280d02] via-[#070607] to-[#0d091a]",
      tags: ["Festival Film", "Vibrant Grade", "Rhythm Sync", "9:16 Vertical"],
      role: "Editor & Colorist",
      aspect: "portrait",
    },
    {
      id: "catering-hospitality-promo",
      title: "Catering & Hospitality Brand Promo",
      category: "commercial",
      categoryLabel: "Commercial Promo",
      client: "Culinary & Catering Commercial",
      year: "2025",
      duration: "00:40",
      description:
        "Mouth-watering culinary promo cut with sizzling speed-ramps, macro food cinematography, and crisp sound-layered foley.",
      videoUrl: "https://res.cloudinary.com/ymreyguo/video/upload/f_auto,q_auto/v1790258339/budget_editing.mp4",
      posterGradient: "from-[#250d03] via-[#070607] to-[#150624]",
      tags: ["Commercial Cut", "Food Foley", "B-Roll Assembly", "Macro Pacing"],
      role: "Editor & Sound Designer",
      aspect: "portrait",
    },
  ] as ProjectItem[],

  services: [
    {
      id: "short-form",
      title: "High-Retention Short-Form Content",
      description:
        "Engineered for the scroll culture. Strategic hook framing, micro-animations, speed ramps, and crisp sound design tuned to stop thumb scrolls and maximize watch time.",
      highlight: "Tuned for Instagram Reels, YouTube Shorts, and TikTok algorithms.",
      deliverables: [
        "Hook-first structure analysis",
        "Stylized animated subtitles",
        "Dynamic camera punches & zooms",
        "Punchy SFX riser & impact packs",
      ],
    },
    {
      id: "motion-graphics",
      title: "Motion Design & After Effects Mastery",
      description:
        "Custom visual graphics bridging footage and art direction. Kinetic typography, 2.5D photo-to-video depth mapping, logo reveals, and clean compositing.",
      highlight: "High-impact Adobe After Effects motion graphics pipeline.",
      deliverables: [
        "Kinetic typography & titles",
        "2.5D photo-to-video parallax",
        "Motion track & visual FX",
        "Custom transitions & stinger reveals",
      ],
    },
    {
      id: "color-grading",
      title: "DaVinci Resolve Color Grading",
      description:
        "Professional node-based color science in DaVinci Resolve Studio. Rich skin tones, film print emulation, warm halation, and contrast balancing.",
      highlight: "Industry-standard DaVinci Resolve color science pipeline.",
      deliverables: [
        "Custom film emulation & color science",
        "Shot-to-shot color balance & matching",
        "Skin tone isolation & clean balancing",
        "Delivery in theater-ready color profiles",
      ],
    },
    {
      id: "commercial-events",
      title: "Commercial & Event Post-Production",
      description:
        "Sharply edited narratives for corporate inaugurations, festival recaps, wedding/engagement stories, and culinary brand promos designed to command attention.",
      highlight: "Multi-camera synchronization and atmospheric storytelling.",
      deliverables: [
        "Narrative assembly & story polishing",
        "Sound design & audio sweetening",
        "Aspect ratio packages (16:9 & 9:16)",
        "Title cards & branded motion accents",
      ],
    },
  ] as ServiceItem[],

  workflow: [
    {
      step: "01",
      title: "Ingest & Assembly",
      description:
        "Organizing raw footage, selecting hero takes, and laying down the core rhythm and narrative spine without distractions.",
    },
    {
      step: "02",
      title: "Kinetic Cut & Pacing",
      description:
        "Fine-tuning transitions, match cuts, speed ramps, and frame-accurate timing against the master audio track.",
    },
    {
      step: "03",
      title: "Sound Design & Motion",
      description:
        "Layering immersive atmospheric sound effects, bass drops, impacts, and bespoke After Effects motion graphics.",
    },
    {
      step: "04",
      title: "Color Grade & Master",
      description:
        "DaVinci Resolve node-based color science, film print emulation, and multi-format delivery ready for premiere.",
    },
  ],
};
