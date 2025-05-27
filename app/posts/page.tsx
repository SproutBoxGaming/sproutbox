import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function PostsPage() {
  const postsDir = path.join(process.cwd(), '_posts');
  const files = fs.readdirSync(postsDir);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    return {
      title: data.title || slug,
      slug,
    };
  });

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <ul>
        {posts.map(({ title, slug }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
