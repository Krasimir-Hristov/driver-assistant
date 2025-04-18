export type DayType = 'work' | 'off' | 'vacation' | 'sick' | 'additional_vacation';

export interface CalendarModification {
  id: string;
  user_id: string;
  date: string;       // 'YYYY-MM-DD'
  day_type: DayType;
  created_at: string; // ISO timestamp
}
