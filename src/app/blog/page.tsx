export const metadata = {
  title: "Blog",
  description: "Experiments, notes, and distribution tests from Viral Dead Engine."
};

export default function BlogIndex() {
  return (
    <main style={{ paddingTop: 32 }}>
      <h1>Blog</h1>

      <p>
        This blog documents experiments, media distribution tests, and observations
        from the Viral Dead Engine project.
      </p>

      <ul style={{ marginTop: 24, lineHeight: 1.8 }}>
        <li>
          <a href="/blog/first-test">
            First Viral Test: Short-Form Media Loops
          </a>
        </li>
      </ul>
    </main>
  );
}
