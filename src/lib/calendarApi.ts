import type { SupabaseClient } from '@supabase/supabase-js';
import type { CalendarModification, DayType } from '@/types/calendar';

export async function fetchUserModifications(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from('calendar_modifications')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return data as CalendarModification[];
}

export async function upsertModification(
  supabase: SupabaseClient,
  userId: string,
  date: string,
  dayType: DayType
) {
  const { data, error } = await supabase
    .from('calendar_modifications')
    .upsert({ user_id: userId, date, day_type: dayType })
    .eq('user_id', userId)
    .eq('date', date);
  if (error) throw error;
  return data;
}
