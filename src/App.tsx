import "./App.css";
import Header from "./components/Header";
import ThemeSwitch from "./components/ThemeSwitch";
import TodoList from "./components/TodoList";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./stores/store";

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <div>
          <ThemeSwitch />
          <hr />
          <Header />
          <hr />
          <TodoList />
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
