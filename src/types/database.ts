/**
 * TypeScript types matching the Supabase production schema.
 * Generated manually to match supabase/schema.sql
 */

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// ─── Row types ────────────────────────────────────────────────
export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: "super_admin" | "librarian" | "curator" | "viewer";
  permissions: Json;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  title_marathi?: string | null;
  slug?: string | null;
  author: string;
  isbn?: string | null;
  language?: string;
  category?: string;
  shelf_number?: string | null;
  publication_year?: number | null;
  publisher?: string | null;
  description?: string | null;
  cover_url?: string | null;
  availability?: "available" | "issued" | "reference_only";
  is_featured?: boolean;
  is_archived?: boolean;
  rating?: number;
  total_ratings?: number;
  borrow_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface BookRating {
  id: string;
  book_id: string;
  user_email: string;
  rating_score: number;
  review_text: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  title_marathi?: string | null;
  slug?: string | null;
  description?: string | null;
  event_date: string;
  event_end_date?: string | null;
  event_time?: string | null;
  location?: string | null;
  image_url?: string | null;
  banner_url?: string | null;
  video_url?: string | null;
  registration_link?: string | null;
  status?: string | null;
  attendees_count?: number;
  is_featured?: boolean;
  is_archived?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string | null;
  button_text: string | null;
  button_link: string | null;
  display_order: number;
  is_active: boolean;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string | null;
  content: string | null;
  excerpt: string | null;
  thumbnail_url: string | null;
  category: "announcement" | "news" | "event" | "notice" | "blog";
  status: "draft" | "published" | "scheduled" | "archived";
  language: "mr" | "hi" | "en";
  is_pinned: boolean;
  tags: string[];
  published_at: string | null;
  scheduled_at: string | null;
  author_email: string | null;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  category?: string | null;
  description: string | null;
  cover_url: string | null;
  event_id: string | null;
  is_featured?: boolean;
  is_archived: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  album_id: string;
  type: "photo" | "video";
  url: string;
  thumbnail_url: string | null;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string | null;
  priority: "urgent" | "high" | "normal" | "low";
  type: "general" | "holiday" | "event" | "exam" | "admission";
  is_active: boolean;
  expires_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  membership_type: "standard" | "student" | "senior" | "lifetime";
  status: "pending" | "active" | "expired" | "suspended";
  membership_start: string | null;
  membership_end: string | null;
  books_borrowed: number;
  photo_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: Json;
  description: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_email: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  resource_title: string | null;
  details: Json | null;
  created_at: string;
}

// ─── Database interface for Supabase client ───────────────────
export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUser;
        Insert: Partial<AdminUser>;
        Update: Partial<AdminUser>;
      };
      books: {
        Row: Book;
        Insert: Partial<Book>;
        Update: Partial<Book>;
      };
      book_ratings: {
        Row: BookRating;
        Insert: Partial<BookRating>;
        Update: Partial<BookRating>;
      };
      events: {
        Row: Event;
        Insert: Partial<Event>;
        Update: Partial<Event>;
      };
      carousel_slides: {
        Row: CarouselSlide;
        Insert: Partial<CarouselSlide>;
        Update: Partial<CarouselSlide>;
      };
      posts: {
        Row: Post;
        Insert: Partial<Post>;
        Update: Partial<Post>;
      };
      gallery_albums: {
        Row: GalleryAlbum;
        Insert: Partial<GalleryAlbum>;
        Update: Partial<GalleryAlbum>;
      };
      gallery_items: {
        Row: GalleryItem;
        Insert: Partial<GalleryItem>;
        Update: Partial<GalleryItem>;
      };
      notices: {
        Row: Notice;
        Insert: Partial<Notice>;
        Update: Partial<Notice>;
      };
      members: {
        Row: Member;
        Insert: Partial<Member>;
        Update: Partial<Member>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Partial<SiteSetting>;
        Update: Partial<SiteSetting>;
      };
      audit_log: {
        Row: AuditLog;
        Insert: Partial<AuditLog>;
        Update: Partial<AuditLog>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<never, never>; Returns: boolean };
    };
    Enums: Record<string, never>;
  };
}

// ─── UI & Extended Types ─────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  content: string;
  photo_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Quote {
  id: string;
  quote_text: string;
  quote_text_hi?: string | null;
  author_name: string;
  source?: string | null;
  display_date?: string | null;
  is_active: boolean;
  created_at: string;
}

export type PostWithAuthor = Post & {
  author_name?: string;
  image_url?: string;
};

export type BookWithRelations = Book;

