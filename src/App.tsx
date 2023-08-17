import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { v1 } from 'uuid';

export type FilterValueType = "all" | "completed" | "active"
function App() {

  let [tasks, setTasks] = useState< Array<TaskType> >([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false }
  ]);

  let [filter, setFilter] = useState<FilterValueType>("all");

  function removeTask(id: string) {
    let resultTasks = tasks.filter(el => el.id !== id);
    setTasks(resultTasks);
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((el) => el.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks]);
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(el => el.isDone === true)
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(el => el.isDone === false)
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus} 
        filter={filter} />
      {/* <Todolist title="What to do" tasks={tasks2} /> */}
    </div>
  );
}

export default App;
