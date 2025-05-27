import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function HomePage() {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');

    return {
      title: data.title || 'Untitled',
      slug,
    };
  });

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">SproutBox Gaming Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-2">
            <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
