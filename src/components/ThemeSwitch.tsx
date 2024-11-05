import { useTheme } from "../contexts/ThemeContext";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <h1>Переключатель темы</h1>
      <div>Текущая тема: {theme}</div>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}
