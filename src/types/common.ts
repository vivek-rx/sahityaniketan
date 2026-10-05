/**
 * Common types used across the application
 */

/** Standard paginated response */
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** Standard API response */
export interface ApiResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Search parameters for catalogue */
export interface BookSearchParams {
  query?: string;
  category?: string;
  author?: string;
  language?: string;
  publisher?: string;
  availability?: string;
  year?: string;
  page?: number;
  sort?: "title" | "year" | "author" | "newest";
}

/** Common status types */
export type BookAvailability = "available" | "issued" | "reference_only" | "lost";
export type MembershipStatus = "pending" | "approved" | "rejected" | "expired" | "renewed";
export type PostStatus = "draft" | "published" | "scheduled";
export type PostCategory = "update" | "announcement" | "notice" | "achievement";
export type EventStatus = "upcoming" | "ongoing" | "past" | "cancelled";
export type GalleryCategory = "events" | "library" | "heritage" | "general";
export type GalleryItemType = "image" | "video";
export type UserRole = "admin" | "member" | "visitor";

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

/** Stats for homepage */
export interface SiteStats {
  totalBooks: number;
  totalMembers: number;
  yearsActive: number;
  totalEvents: number;
}

/** Sort option */
export interface SortOption {
  label: string;
  value: string;
}

/** Filter option */
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}
