import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export default function PostPage({ params }: { params: { slug: string } }) {
  const postPath = path.join(process.cwd(), '_posts', `${params.slug}.md`);

  if (!fs.existsSync(postPath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(postPath, 'utf8');
  const { data, content } = matter(fileContents);
  const html = marked(content);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
