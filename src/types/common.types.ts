export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
export interface ApiError { message: string; status: number; errors?: Record<string, string>; }
export interface SelectOption { value: string | number; label: string; }
export interface IdName { id: number; name: string; }
