import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function PostsPage() {
  const postsDirectory = path.join(process.cwd(), '_posts');
  const filenames = fs.existsSync(postsDirectory) ? fs.readdirSync(postsDirectory) : [];

  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title || filename.replace(/\.md$/, ''),
        slug: filename.replace(/\.md$/, ''),
      };
    });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <ul className="list-disc ml-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
