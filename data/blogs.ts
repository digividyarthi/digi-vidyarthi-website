import blogsData from '@/blogs.json';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  date: string;
  dateFormatted: string;
  alt?: string;
}

export const allBlogs: BlogPost[] = blogsData as BlogPost[];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return allBlogs.find(
    (b) => b.slug === slug || b.id === slug || encodeURIComponent(b.slug) === slug
  );
}

export function getAllBlogSlugs(): string[] {
  return allBlogs.map((b) => b.slug);
}

export function getRecentBlogs(count = 5): BlogPost[] {
  return allBlogs.slice(0, count);
}

export function getRelatedBlogs(currentSlug: string, count = 2): BlogPost[] {
  const current = getBlogBySlug(currentSlug);
  if (!current) return allBlogs.slice(0, count);
  return allBlogs
    .filter((b) => b.slug !== currentSlug && (b.category === current.category || b.tags.some(t => current.tags.includes(t))))
    .slice(0, count);
}
