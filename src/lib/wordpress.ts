const WP_API_URL = process.env.WORDPRESS_API_URL || 'https://wp.aseemkishore.com/wp-json/wp/v2';

export interface WPPostMeta {
  project_url: string;
  project_description: string;
  project_tech_stack: string;
  project_role: string;
  project_status: string;
  project_founded: string;
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  meta: WPPostMeta;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}, fallback?: T): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`WordPress API error: ${res.status} ${res.statusText} for ${endpoint}`);
      if (fallback !== undefined) return fallback;
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`WordPress API fetch failed for ${endpoint}:`, error);
    if (fallback !== undefined) return fallback;
    throw error;
  }
}

export async function getPosts(perPage = 10, page = 1): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>('/posts', {
    per_page: String(perPage),
    page: String(page),
    _embed: 'true',
  }, []);
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>('/posts', {
    slug,
    _embed: 'true',
  }, []);
  return posts[0] || null;
}

export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>('/categories', {
    per_page: '100',
  }, []);
}

export async function getPostsByCategory(categoryId: number, perPage = 10): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>('/posts', {
    categories: String(categoryId),
    per_page: String(perPage),
    _embed: 'true',
  }, []);
}

export async function getPostsByCategorySlug(slug: string, perPage = 10): Promise<WPPost[]> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return [];
  return getPostsByCategory(category.id, perPage);
}
