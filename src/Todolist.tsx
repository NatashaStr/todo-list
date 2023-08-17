import React, { ChangeEvent, ChangeEventHandler, KeyboardEvent, useState } from 'react';
import { FilterValueType } from './App';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}

type PropsType = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string) => void,
  changeFilter: (value: FilterValueType) => void,
  addTask: (title: string) => void,
  changeStatus: (taskId: string, isDone: boolean) => void,
  filter: FilterValueType
}

function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(evt.currentTarget.value);
  const onKeyDownHandler = (evt: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (evt.key === "Enter") {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  }
  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("")
    } else {
      setError('Title is required')
    }
  }
  const onAllClickHandler = () => { props.changeFilter("all") };
  const onActiveClickHandler = () => { props.changeFilter("active") };
  const onCompletedClickHandler = () => { props.changeFilter("completed") };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""} />
        <button onClick={addNewTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map((el) => {
            const onRemoveHandler = () => { props.removeTask(el.id) };
            const onChangeTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => { props.changeStatus(el.id, evt.currentTarget.checked) }
            
            return (
              <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                <input type="checkbox" onChange={onChangeTaskHandler} />
                <span>{el.title}</span>
                <button onClick={onRemoveHandler}>X</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={ props.filter === 'all' ? 'active-filter' : '' } onClick={onAllClickHandler}>ALL</button>
        <button className={ props.filter === 'active' ? 'active-filter' : '' } onClick={onActiveClickHandler}>ACTIVE</button>
        <button className={ props.filter === 'completed' ? 'active-filter' : '' } onClick={onCompletedClickHandler}>COMPLETED</button>
      </div>
    </div >
  )
}

export default Todolist;