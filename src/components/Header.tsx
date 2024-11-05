import { useSelector } from "react-redux";
import { useTheme } from "../contexts/ThemeContext";
import { selectTodos } from "../stores/todoSlice";

export default function Header() {
  const { theme } = useTheme();
  const todos = useSelector(selectTodos);
  const completed = todos.filter((todo) => todo.completed).length;
  const uncompleted = todos.length - completed;

  return (
    <div>
      <h1>Header</h1>
      <div>Тема: {theme}</div>
      <h3>Статистика:</h3>
      <div>Всего задач: {todos.length}</div>
      <div>Завершенные: {completed}</div>
      <div>В процессе: {uncompleted}</div>
    </div>
  );
}
