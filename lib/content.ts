export type Service = {
  day: string;
  name: string;
  time: string;
  note: string;
  image: string;
};

export type Leader = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

export type Ministry = {
  name: string;
  icon: string;
  description: string;
};

export type ChurchEvent = {
  id: string;
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  time: string;
  location: string;
  description: string;
  image: string;
  featured: boolean;
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  span: "normal" | "wide" | "tall";
};

export type Sermon = {
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  description: string;
  youtube: string;
};

export type Testimony = {
  name: string;
  role: string;
  quote: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Message = {
  id: string;
  type: "contact" | "testimony" | "visit";
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type SiteContent = {
  site: {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    logo: string;
    nbcLogo: string;
    phone: string;
    email: string;
    givingEmail: string;
    address: string;
    serviceTime: string;
    socials: { youtube: string; instagram: string; facebook: string };
    footerNote: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[];
    accentLine: string;
    subtitle: string;
    image: string;
    scripture: string;
    scriptureRef: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  theme: {
    year: string;
    title: string;
    verse: string;
    description: string;
    image: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: string;
    image2: string;
    quote: string;
    stats: Stat[];
  };
  identity: {
    vision: string;
    mission: string;
    values: string[];
    anthem: string[];
    anthemNote: string;
  };
  services: Service[];
  leadership: {
    lead: Leader;
    team: Leader[];
  };
  ministries: Ministry[];
  events: ChurchEvent[];
  gallery: GalleryItem[];
  sermons: Sermon[];
  testimonies: Testimony[];
  giving: {
    intro: string;
    banks: {
      label: string;
      bank: string;
      accountName: string;
      accountNumber: string;
      currency: string;
    }[];
    note: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    mapQuery: string;
    officeHours: { day: string; time: string }[];
  };
  visit: {
    intro: string;
    steps: { title: string; text: string }[];
  };
  messages: Message[];
};

export const defaultContent: SiteContent = {
  site: {
    name: "Ifako First Baptist Church",
    shortName: "IFBC",
    tagline: "Sanctuary of Truth & Joy",
    description:
      "A Baptist family in the heart of Ifako-Agege, Lagos. Rooted in faith, committed to community, and shaped by the joy of the Gospel.",
    logo: "/images/logo_v3.png",
    nbcLogo: "/images/nbc_logo_final.png",
    phone: "080 3333 9621",
    email: "ifbclagos@gmail.com",
    givingEmail: "finance@ifakobaptist.org",
    address:
      "23, Coker Street, off College Road, Ifako Agege, P.O. Box 2798, Agege, Lagos",
    serviceTime: "Sundays · 10:00 AM (WAT)",
    socials: {
      youtube: "https://youtube.com/@ifbclagos",
      instagram: "https://instagram.com/ifbclagos",
      facebook: "https://facebook.com/profile.php?id=61584244181992",
    },
    footerNote:
      "Part of the Nigerian Baptist Convention · Lagos Central Baptist Conference",
  },
  hero: {
    eyebrow: "Ifako First Baptist Church · Lagos, Nigeria",
    titleLines: ["A sanctuary", "of truth"],
    accentLine: "& joy.",
    subtitle:
      "Rooted in faith. Committed to community. A Baptist family in the heart of Ifako-Agege where every person is welcomed, every story matters, and every Sunday feels like coming home.",
    image: "/images/hero-worship.jpg",
    scripture:
      "I was glad when they said unto me, Let us go into the house of the LORD.",
    scriptureRef: "Psalm 122:1",
    ctaPrimary: { label: "Plan your visit", href: "/visit" },
    ctaSecondary: { label: "Watch live", href: "/live" },
  },
  theme: {
    year: "2026",
    title: "My year of Glorious Comeback",
    verse: "Judges 11:6–9",
    description: "Expect testimonies. Stay rooted in praise.",
    image: "/images/theme_sky.jpg",
  },
  about: {
    eyebrow: "Our story",
    title: "Rooted in faith. Committed to community.",
    paragraphs: [
      "Ifako First Baptist Church is part of the Nigerian Baptist Convention — the largest Baptist denomination in Africa. Since our beginnings, we have existed to share the truth of the Gospel with love, joy, and practical care.",
      "We are a local church in the Lagos Central Baptist Conference, serving Ifako-Ijaiye and beyond through worship, discipleship, and outreach.",
      "Our heritage traces back to 1850, when Rev. Thomas Jefferson Bowen began Baptist work in Nigeria at Ijaye Orile. Today, we continue that legacy as a Sanctuary of Truth & Joy for our community.",
    ],
    image: "/images/church_building_enhanced.jpg",
    image2: "/images/cathedral-light.jpg",
    quote:
      "We are a community of believers in Jesus Christ that exists to live and teach God’s truth.",
    stats: [
      { value: "1850", label: "Heritage of Baptist work in Nigeria" },
      { value: "14", label: "Ministries & departments" },
      { value: "03", label: "Weekly gatherings" },
      { value: "01", label: "Family in Christ" },
    ],
  },
  identity: {
    vision: "Our vision is to be the Congregation of Truth and Joy.",
    mission:
      "To be a community of believers in Jesus Christ that exists to live and teach God’s truth.",
    values: ["Holiness", "Relationship", "Integrity", "Dedication", "Joy"],
    anthem: [
      "Ijó alayọ̀ ni ijó wa o,",
      "Ọlọ́run ayọ̀, la ńjọ́sìn fún;",
      "Ọjọ́ ayọ̀ lọ́dọ̀ bá wa o,",
      "Ẹ bá wa yọ̀ adùn rere.",
    ],
    anthemNote:
      "The anthem of Ifako First Baptist Church, sung in Yoruba — a declaration that our worship is a dance of joy before God.",
  },
  services: [
    {
      day: "Sunday",
      name: "Sunday School",
      time: "9:00 AM",
      note: "Classes for every age, from children to adults.",
      image: "/images/bible-study.jpg",
    },
    {
      day: "Sunday",
      name: "Worship Service",
      time: "10:00 AM",
      note: "Praise, prayer, the Word, and Holy Communion.",
      image: "/images/hero-worship.jpg",
    },
    {
      day: "Thursday",
      name: "Bible Study",
      time: "6:30 PM",
      note: "Going deeper into Scripture together, midweek.",
      image: "/images/bible-hands.jpg",
    },
    {
      day: "3rd Thursday",
      name: "Miracle & Deliverance",
      time: "6:30 PM",
      note: "A monthly evening of prayer, faith, and testimony.",
      image: "/images/prayer-silhouette.jpg",
    },
  ],
  leadership: {
    lead: {
      name: "Revd. Tunde Oyaleke",
      role: "Lead Pastor",
      image: "/images/pastor_portrait_v2.jpg",
      bio: "Revd. Oyaleke leads with a vision for worship, discipleship, and community care — serving Ifako-Ijaiye with humility and joy.",
    },
    team: [
      {
        name: "Engr. Adefemi Afolabi",
        role: "Deacon",
        image: "/images/deacon-femi.jpg",
        bio: "Serving the church through spiritual leadership, practical ministry, and a steady commitment to the household of faith.",
      },
      {
        name: "Dr. Funmi Oyebamiji",
        role: "Deaconess",
        image: "/images/deacon-funmi.jpg",
        bio: "Giving herself to pastoral care, member welfare, and the quiet work of building up the body of Christ.",
      },
    ],
  },
  ministries: [
    {
      name: "Music Ministry",
      icon: "Music4",
      description: "Lead the congregation in worship through songs and hymns.",
    },
    {
      name: "Pastorate",
      icon: "HeartHandshake",
      description:
        "Support pastoral care, visitation, and member welfare.",
    },
    {
      name: "Deaconate",
      icon: "HandHeart",
      description:
        "Serve the church through spiritual leadership and practical ministry.",
    },
    {
      name: "Education",
      icon: "GraduationCap",
      description:
        "Coordinate Sunday School and discipleship training programs.",
    },
    {
      name: "Evangelism",
      icon: "Megaphone",
      description:
        "Spearhead outreach efforts to share the Gospel with the community.",
    },
    {
      name: "Children",
      icon: "Baby",
      description: "Nurture the faith of our youngest members.",
    },
    {
      name: "Youth & Young Adults",
      icon: "Sparkles",
      description:
        "Walk with the next generation through faith, friendship, and purpose.",
    },
    {
      name: "Media & Publicity",
      icon: "Radio",
      description:
        "Handle communications, social media, and live streaming.",
    },
    {
      name: "Ushering",
      icon: "Users",
      description: "Create a welcoming atmosphere for worship.",
    },
    {
      name: "Welfare",
      icon: "LifeBuoy",
      description:
        "Support members in need through care and assistance.",
    },
    {
      name: "Finance",
      icon: "Landmark",
      description:
        "Manage church resources with integrity and transparency.",
    },
    {
      name: "Membership",
      icon: "ClipboardList",
      description:
        "Welcome new members and maintain church records.",
    },
    {
      name: "Security",
      icon: "ShieldCheck",
      description:
        "Ensure safety and order during church services and events.",
    },
    {
      name: "Maintenance & Property",
      icon: "Wrench",
      description:
        "Oversee the upkeep and development of church facilities.",
    },
    {
      name: "Decorating Committee",
      icon: "Flower2",
      description:
        "Beautify the sanctuary and church premises for services and events.",
    },
  ],
  events: [
    {
      id: "mmu-2026",
      slug: "mmu-emphasis-sunday",
      title: "MMU Emphasis Sunday",
      date: "Sunday, 8 February 2026",
      isoDate: "2026-02-08T10:00:00+01:00",
      time: "10:00 AM",
      location: "Church Sanctuary",
      description:
        "Theme: Restorer of Broken Walls (Nehemiah 1:1–9, 2:1–20 | Isaiah 58:12). A Sunday set apart for the Men’s Missionary Union — celebrating the men who build, repair, and stand in the gap.",
      image: "/images/mmu_emphasis.jpg",
      featured: true,
    },
    {
      id: "thanksgiving-2026",
      slug: "family-thanksgiving-love-feast",
      title: "Annual Family Thanksgiving & Love Feast",
      date: "Second Sunday, November 2026",
      isoDate: "2026-11-08T10:00:00+01:00",
      time: "10:00 AM",
      location: "Church Compound",
      description:
        "A day of gratitude, music, and community. We gather as one family to give thanks for the year, share a love feast, and celebrate God’s faithfulness together.",
      image: "/images/event_thanksgiving.jpg",
      featured: false,
    },
    {
      id: "flourish-2026",
      slug: "flourish-trade-fair",
      title: "Flourish Trade Fair",
      date: "Quarterly",
      isoDate: "2026-09-19T09:00:00+01:00",
      time: "9:00 AM – 4:00 PM",
      location: "Church Grounds",
      description:
        "Support member-owned businesses — network, shop, and grow. Flourish is our quarterly marketplace where the church family brings its craft, trade, and enterprise into one place.",
      image: "/images/event_flourish.jpg",
      featured: false,
    },
  ],
  gallery: [
    {
      src: "/images/hero-worship.jpg",
      alt: "Congregation worshiping with hands raised",
      caption: "Sunday worship",
      span: "wide",
    },
    {
      src: "/images/choir.jpg",
      alt: "Choir singing in white and gold",
      caption: "The choir",
      span: "tall",
    },
    {
      src: "/images/community.jpg",
      alt: "Church family standing together at sunset",
      caption: "One family",
      span: "normal",
    },
    {
      src: "/images/children.jpg",
      alt: "A child reading the Bible",
      caption: "Children’s church",
      span: "normal",
    },
    {
      src: "/images/prayer-silhouette.jpg",
      alt: "A man kneeling in prayer",
      caption: "Prayer",
      span: "tall",
    },
    {
      src: "/images/thanksgiving.jpg",
      alt: "A table set for the love feast",
      caption: "Love feast",
      span: "wide",
    },
    {
      src: "/images/cathedral-light.jpg",
      alt: "Light falling through cathedral windows",
      caption: "Sanctuary light",
      span: "normal",
    },
    {
      src: "/images/stained-glass.jpg",
      alt: "Stained glass window",
      caption: "Stained glass",
      span: "normal",
    },
    {
      src: "/images/youth.jpg",
      alt: "Young people smiling together",
      caption: "Youth",
      span: "normal",
    },
    {
      src: "/images/outreach.jpg",
      alt: "Outreach in the community",
      caption: "Outreach",
      span: "wide",
    },
    {
      src: "/images/fellowship.jpg",
      alt: "Friends laughing together outside",
      caption: "Fellowship",
      span: "normal",
    },
    {
      src: "/images/bible-hands.jpg",
      alt: "Hands resting on an open Bible",
      caption: "The Word",
      span: "normal",
    },
  ],
  sermons: [
    {
      title: "My Year of Glorious Comeback",
      speaker: "Revd. Tunde Oyaleke",
      date: "11 January 2026",
      scripture: "Judges 11:6–9",
      description:
        "A word for the year: God is not finished with your story. The same Spirit that turned Jephthah’s rejection into rescue is at work in your life.",
      youtube: "https://youtube.com/@ifbclagos",
    },
    {
      title: "Restorer of Broken Walls",
      speaker: "Revd. Tunde Oyaleke",
      date: "8 February 2026",
      scripture: "Nehemiah 1:1–9, 2:1–20",
      description:
        "Nehemiah wept over ruins — then he rebuilt. A call to see what is broken, carry the burden, and begin the work of restoration.",
      youtube: "https://youtube.com/@ifbclagos",
    },
    {
      title: "The Joy of Salvation",
      speaker: "Revd. Tunde Oyaleke",
      date: "22 March 2026",
      scripture: "Psalm 51:12",
      description:
        "David prayed for the joy of salvation to be restored. Joy is not the absence of trouble; it is the presence of God.",
      youtube: "https://youtube.com/@ifbclagos",
    },
  ],
  testimonies: [
    {
      name: "Adaeze",
      role: "Member since 2019",
      quote:
        "I came in broken and was met with a family that prayed with me until the answer came. This church did not just welcome me — it carried me.",
    },
    {
      name: "Tolu",
      role: "Youth ministry",
      quote:
        "Ifako Baptist gave me a place to ask hard questions and still belong. I found Jesus here, and I found people who walk with me.",
    },
    {
      name: "Mr. & Mrs. Adeyemi",
      role: "Married in the church",
      quote:
        "We were married here, raised our children here, and buried a parent here. This sanctuary has held every season of our lives.",
    },
    {
      name: "Chidinma",
      role: "New member",
      quote:
        "The first Sunday I walked in, someone remembered my name. The second Sunday, someone asked how my week went. That is when I knew I was home.",
    },
  ],
  giving: {
    intro:
      "Give with joy. Your tithes, offerings, and partnership keep the sanctuary open, the Gospel going out, and the work of ministry moving forward.",
    banks: [
      {
        label: "Tithes & Offerings",
        bank: "First Bank of Nigeria Plc",
        accountName: "Ifako First Baptist Church",
        accountNumber: "2000879969",
        currency: "NGN",
      },
      {
        label: "Missions & Partnership",
        bank: "First Bank Nigeria Plc",
        accountName: "Ifako First Baptist Church",
        accountNumber: "2045156942",
        currency: "NGN",
      },
    ],
    note:
      "Please send your transfer confirmation to finance@ifakobaptist.org so it can be receipted. Thank you for giving generously.",
  },
  contact: {
    address:
      "23, Coker Street, off College Road, Ifako Agege, P.O. Box 2798, Agege, Lagos",
    phone: "080 3333 9621",
    email: "ifbclagos@gmail.com",
    mapQuery: "Ifako First Baptist Church, Coker Street, Ifako Agege, Lagos",
    officeHours: [
      { day: "Monday – Friday", time: "9:00 AM – 4:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
      { day: "Sunday", time: "After service" },
    ],
  },
  visit: {
    intro:
      "There’s a place for you here. Come as you are — expect a warm welcome, uplifting worship, and a word of hope.",
    steps: [
      {
        title: "Come as you are",
        text: "No dress code, no perfect story required. Wear what makes you comfortable and bring your questions.",
      },
      {
        title: "Arrive & be welcomed",
        text: "Our ushers will meet you at the gate, help you find a seat, and answer any question you have.",
      },
      {
        title: "Worship with us",
        text: "Sunday School begins at 9:00 AM and worship at 10:00 AM. Expect prayer, praise, and a practical word from Scripture.",
      },
      {
        title: "Find your place",
        text: "Stay after service for refreshments, meet a pastor, or ask about the departments where you can serve.",
      },
    ],
  },
  messages: [],
};

/**
 * Deep-merges a stored document over the built-in defaults so a missing or
 * partial document never breaks a page.
 */
export function normalizeContent(saved: Partial<SiteContent> | null | undefined): SiteContent {
  if (!saved) return defaultContent;
  return {
    ...defaultContent,
    ...saved,
    site: {
      ...defaultContent.site,
      ...(saved.site ?? {}),
      socials: { ...defaultContent.site.socials, ...(saved.site?.socials ?? {}) },
    },
    hero: { ...defaultContent.hero, ...(saved.hero ?? {}) },
    theme: { ...defaultContent.theme, ...(saved.theme ?? {}) },
    about: { ...defaultContent.about, ...(saved.about ?? {}) },
    identity: { ...defaultContent.identity, ...(saved.identity ?? {}) },
    leadership: { ...defaultContent.leadership, ...(saved.leadership ?? {}) },
    giving: { ...defaultContent.giving, ...(saved.giving ?? {}) },
    contact: { ...defaultContent.contact, ...(saved.contact ?? {}) },
    visit: { ...defaultContent.visit, ...(saved.visit ?? {}) },
    messages: saved.messages ?? [],
  };
}
