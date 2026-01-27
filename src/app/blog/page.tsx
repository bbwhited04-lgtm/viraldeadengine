export const metadata = {
  title: "Blog",
  description: "Experiments, notes, and distribution tests from Viral Dead Engine.",
};

export default function BlogIndex() {
  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Blog</h1>
      <p>
        Short posts that power the Viral Dead Engine distribution loop. Each post can be
        used as a landing page target for short-form content.
      </p>

      <ul style={{ marginTop: 24, lineHeight: 1.9 }}>
        <li>
          <a href="/blog/first-test">First Viral Test: Short-Form Media Loops</a>
        </li>
      </ul>
    </main>
  );
}
