import { useTheme } from 'next-themes';


const getUserTheme = () => {
  const { theme, systemTheme } = useTheme();
  theme === systemTheme ? systemTheme : theme;

  return theme === 'dark' ? 'dark' : 'light';
}

export default getUserTheme;