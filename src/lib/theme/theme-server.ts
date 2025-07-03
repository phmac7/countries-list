import { cookies } from 'next/headers';
import { Theme } from './theme';

export const getThemeFromServer = async (): Promise<Theme> => {
  try {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get('theme');
    const value = themeCookie?.value;
    if (value === 'light' || value === 'dark') return value;
    return 'dark';
  } catch {
    return 'dark';
  }
};
