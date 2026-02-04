import { TodoListWidget } from "@/widgets/todo-list";

/** Home page: title and the main todo list widget. */
export default function HomePage(): React.ReactElement {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Todo List</h1>
        <TodoListWidget />
      </div>
    </main>
  );
}
