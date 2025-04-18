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
  // First try to delete any existing modification
  await supabase
    .from('calendar_modifications')
    .delete()
    .eq('user_id', userId)
    .eq('date', date);

  // Then insert the new modification
  const { data, error } = await supabase
    .from('calendar_modifications')
    .insert({ user_id: userId, date, day_type: dayType });

  if (error) throw error;
  return data;
}
