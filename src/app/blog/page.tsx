"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { POSTS } from "./_posts";
import "./blog.css";

export default function BlogIndexPage() {
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const query = q.trim().toLowerCase();
    const sorted = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
    if (!query) return sorted;
    return sorted.filter((p) => {
      const hay = `${p.title} ${p.excerpt} ${(p.tags || []).join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <main className="blogWrap">
      <header className="blogHeader">
        <div>
          <h1 className="h1">Blog</h1>
          <p className="sub">
            Clean, fast posts that turn short-form videos into trackable site traffic.
          </p>
        </div>

        <div className="controls">
          <input
            className="input"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
          />
        </div>
      </header>

      <section className="grid" aria-label="Blog posts">
        {items.map((p) => (
          <article key={p.slug} className="card">
            <Link href={`/blog/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
              <img className="cover" src={p.coverImage} alt={p.title} />
              <div className="cardBody">
                <div className="meta">
                  <span>{new Date(p.date).toLocaleDateString()}</span>
                  {p.tags?.length ? <span>•</span> : null}
                  {p.tags?.slice(0, 2).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <h2 className="title">{p.title}</h2>
                <p className="excerpt">{p.excerpt}</p>
                {p.tags?.length ? (
                  <div className="tagRow" aria-label="Tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
