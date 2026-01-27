"use client";

export default function ShareRow({ url, title }: { url: string; title: string }) {
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
        onClick={async () => {
          if (navigator?.clipboard) {
            await navigator.clipboard.writeText(url);
          }
        }}
      >
        Copy Link
      </button>
    </div>
  );
}
