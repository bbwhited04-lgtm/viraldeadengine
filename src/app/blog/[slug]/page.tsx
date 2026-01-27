import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS } from "../_posts";

const SITE = "https://viraldead.pro";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  const url = `${SITE}/blog/${post.slug}`;
  return {
    title: `${post.title} | ViralDead`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "ViralDead",
      images: [{ url: `${SITE}${post.coverImage}` }],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${SITE}${post.coverImage}`]
    }
  };
}

function ShareRow({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
      >
        Share to Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
      >
        Share to X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
      >
        Share to LinkedIn
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        style={{
          padding: "6px 10px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(0,0,0,0.25)",
          color: "inherit",
          cursor: "pointer"
        }}
      >
        Copy Link
      </button>
    </div>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const url = `${SITE}/blog/${post.slug}`;

  return (
    <main style={{ maxWidth: 860, margin: "0 auto", padding: "26px 18px 60px" }}>
      <Link href="/blog" style={{ opacity: 0.85 }}>← Back to Blog</Link>

      <h1 style={{ fontSize: 34, lineHeight: 1.15, margin: "12px 0 6px" }}>
        {post.title}
      </h1>

      <div style={{ opacity: 0.8, fontSize: 13 }}>
        {new Date(post.date).toLocaleDateString()}
      </div>

      <img
        src={post.coverImage}
        alt={post.title}
        style={{
          width: "100%",
          height: 320,
          objectFit: "cover",
          borderRadius: 18,
          marginTop: 14,
          border: "1px solid rgba(255,255,255,0.12)"
        }}
      />

      <article style={{ marginTop: 18, lineHeight: 1.7, opacity: 0.95 }}>
        {post.content.map((para, idx) => (
          <p key={idx} style={{ margin: "0 0 14px" }}>{para}</p>
        ))}
      </article>

      <hr style={{ margin: "20px 0", opacity: 0.2 }} />

      <div style={{ opacity: 0.9 }}>
        <strong>Share this post</strong>
        <ShareRow url={url} title={post.title} />
      </div>
    </main>
  );
}
