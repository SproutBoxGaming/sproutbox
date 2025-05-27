
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to SproutBox Gaming</h1>
      <p>Game reviews, guides, and more.</p>
      <Link href="/posts" className="text-blue-500 underline">
        View all posts
      </Link>
    </main>
  );
}
