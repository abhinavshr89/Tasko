import React, { useEffect, useState } from "react";
import Todos from "../components/Todos";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, updateTask, createTask } from "../store/slices/taskSlice";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const columnColors = {
  todo: "from-blue-500 to-blue-700",
  "in-progress": "from-yellow-500 to-yellow-700",
  review: "from-purple-500 to-purple-700",
  done: "from-green-500 to-green-700",
};

const HomePage = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  // Popover state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // Kanban columns: todo, in-progress, review, done
  const columns = [
    { key: "todo", label: "To Do" },
    { key: "in-progress", label: "In Progress" },
    { key: "review", label: "Review" },
    { key: "done", label: "Done" },
  ];

  // Drag handler
  const handleUpdateStatus = async (id, status) => {
    dispatch(updateTask({ id, status }));
    dispatch(getTasks());
  };

  // Add Task handler
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    dispatch(createTask(form));
    setForm({ title: "", description: "" });
    setOpen(false);
    dispatch(getTasks());
  };

  // Filter tasks by status for each column
  const tasksByStatus = (status) => tasks.filter((t) => t.status === status);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gradient-to-br bg-black grid-lines text-white ">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mb-8 gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">
          Kanban Board
        </h1>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform">
              <PlusIcon className="mr-2" />
              Add Task
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-[#18181b] border-none shadow-2xl">
            <form onSubmit={handleAddTask} className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg mb-1 text-white">
                Add New Task
              </h2>
              <Input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="bg-[#27272a] border-none text-white"
              />
              <Textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="bg-[#27272a] border-none text-white"
              />
              <Button
                type="submit"
                className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow"
              >
                Add
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      {loading && <div>Loading...</div>}
      <div className="flex flex-col md:flex-row w-full max-w-7xl gap-6">
        {columns.map((col) => (
          <div
            key={col.key}
            className="flex-1 min-w-[250px] bg-[#18181b] rounded-2xl shadow-2xl p-4 flex flex-col transition-transform "
          >
            <div
              className={`rounded-xl mb-4 py-2 px-3 text-lg font-bold text-white bg-gradient-to-r ${
                columnColors[col.key]
              } shadow`}
            >
              {col.label}
            </div>
            <Todos
              todos={tasksByStatus(col.key)}
              updateTodoStatus={handleUpdateStatus}
              columnLabel={col.label}
              columnStatus={col.key}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
