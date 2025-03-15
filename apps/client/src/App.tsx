import "./App.css";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";

function App() {
  return (
    <div>
      <h2>Hono RPC Example</h2>
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;
