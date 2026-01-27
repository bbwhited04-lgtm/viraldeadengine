export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  coverImage: string; // path under /public
  tags?: string[];
  content: string[]; // simple paragraphs
};

export const POSTS: BlogPost[] = [
  {
    slug: "welcome-to-viraldead",
    title: "Welcome to ViralDead",
    excerpt:
      "What ViralDead is, how it works, and how we turn shorts into trackable traffic.",
    date: "2026-01-27",
    coverImage: "/blog/covers/welcome.jpg",
    tags: ["launch", "content"],
    content: [
      "ViralDead is a simple engine: publish short-form content that points back to a useful blog page with trackable links.",
      "This site is built for speed, clarity, and consistency—so you can post daily without babysitting the tech.",
      "Next up: daily shorts, embedded posts, and a lightweight subscribe flow."
    ]
  },
  {
    slug: "shorts-to-blog-pipeline",
    title: "Shorts → Blog → Trackable Links (The Pipeline)",
    excerpt:
      "How one CapCut short becomes 10+ posts across TikTok, Facebook, and YouTube—without chaos.",
    date: "2026-01-27",
    coverImage: "/blog/covers/pipeline.jpg",
    tags: ["pipeline", "growth"],
    content: [
      "Record or generate a short. Post it everywhere. Then embed it in a blog page with a clear call-to-action.",
      "Every platform gets its own caption style, but they all point to the same destination page.",
      "Use UTM-style query params so you know exactly which platform is paying off."
    ]
  }
];
