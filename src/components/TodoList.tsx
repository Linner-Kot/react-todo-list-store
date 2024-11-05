import { useEffect, useState } from "react";
import TotoItem from "./TotoItem";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  fetchTodos,
  selectTodos,
  toggleCompletion,
} from "../stores/todoSlice.ts";

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const [newTask, setNewTask] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchValue = useDebounce(searchInput, 500);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTaskHandle = () => {
    if (!newTask) return;

    dispatch(addTask(newTask));
    setNewTask("");
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title
      .toLocaleLowerCase()
      .includes(debouncedSearchValue.toLocaleLowerCase())
  );

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Список задач</h1>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="Введите название для новой задачи"
        />
        <button onClick={addTaskHandle}>Добавить задачу</button>
      </div>

      <SearchInput searchData={searchInput} setSearchData={setSearchInput} />

      <ul style={{ marginTop: "30px" }}>
        {filteredTodos.map((todo) => (
          <TotoItem
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            deleteTask={(id) => dispatch(deleteTask(id))}
            toggleCompletion={(id) => dispatch(toggleCompletion(id))}
            key={todo.id}
          />
        ))}
      </ul>
    </div>
  );
}
