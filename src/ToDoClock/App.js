import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const myDate = new Date();
  const [hour, setHour] = useState("");
  const [mints, setMints] = useState("");
  const [secondes, setSecondes] = useState("");
  const [hourInput, setHourInput] = useState("");
  const [edit, setEdit] = useState(1);

  const [task, setTask] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [getIdEditing, setGetIdEditing] = useState(false);

  const [addedTaskList, setAddedTaskList] = useLocalStorageState([], "tasks");
  // const [addedTaskList, setAddedTaskList] = useState(function () {
  //   const storedTasks = localStorage.getItem("tasks");
  //   return JSON.parse(storedTasks);
  // });

  const TIME = `${hour === 12 ? 24 : 12}:${mints}:${secondes}${
    hour > 12 ? " PM" : " AM"
  } `;
  const morning = hourInput >= 1 && hourInput <= 12;
  const evening = hourInput >= 13 && hourInput <= 18;
  const night = hourInput >= 19 && hourInput <= 24;

  useEffect(() => {
    function getTime() {
      setTimeout(() => {
        setHour((hour) => myDate.getHours());
        setMints((mints) => myDate.getMinutes());
        setSecondes((secondes) => myDate.getSeconds());
      }, 1000);
    }
    getTime();
  }, [myDate, hour, secondes, mints]);

  function handelCheck(task) {
    setAddedTaskList((addedTaskList) =>
      addedTaskList.map((item) =>
        item.id === task.id ? { ...item, checkS: !item.checkS } : item
      )
    );
  }
  function deleteTaskFunc(task) {
    setAddedTaskList((addedTaskList) =>
      addedTaskList.filter((ta) => ta.id !== task.id)
    );
    setShowEdit((showEdit) => false);
    setEdit("");
  }

  function setShowEditFunc(task) {
    setShowEdit((showEdit) => !showEdit);
    setEdit((edit) => (edit = task.taskName));
    setGetIdEditing((getIdEditing) => (getIdEditing = task.id));
    console.log(task);
  }
  function editTask(id) {
    setAddedTaskList((addedTaskList) =>
      addedTaskList.map((item) =>
        item.id === id ? { ...item, taskName: edit } : item
      )
    );
    setShowEdit((showEdit) => !showEdit);
    setEdit("");
  }
  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(addedTaskList));
  // }, [addedTaskList]);

  console.log(addedTaskList);
  return (
    <>
      <div className="app">
        <div className="watch">
          <span className="hour">
            {hour.toString().length < 2
              ? `${hour === 12 ? 24 : 12}`
              : hour === 12
              ? 24
              : 12}
          </span>
          :{" "}
          <span className="mints">
            {mints.toString().length < 2 ? `0${mints}` : mints}
          </span>
          :{" "}
          <span className="secondes">
            {secondes.toString().length < 2 ? `0${secondes}` : secondes}
          </span>
          <span>{hour > 12 ? "PM" : "AM"}</span>
        </div>
      </div>
      <GetHour hourInput={hourInput} setHourInput={setHourInput} />
      <Status morning={morning} evening={evening} night={night} />
      <div className="to_do_list">
        <Form
          task={task}
          setTask={setTask}
          setAddedTaskList={setAddedTaskList}
          addedTaskList={addedTaskList}
          TIME={TIME}
        />
        <ShowAddedTasks
          addedTaskList={addedTaskList}
          handelCheck={handelCheck}
          deleteTaskFunc={deleteTaskFunc}
          setShowEditFunc={setShowEditFunc}
        />
      </div>
      {showEdit && (
        <div className="edit___form">
          <EditForm
            getIdEditing={getIdEditing}
            editTask={editTask}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
      )}
    </>
  );
}

function GetHour({ hourInput, setHourInput }) {
  return (
    <div>
      <input
        type="number"
        value={hourInput}
        min={1}
        max={24}
        onChange={(e) => setHourInput(e.target.value)}
      />
    </div>
  );
}
function Status({ hourInput, morning, evening, night }) {
  return (
    <div className="status">
      {morning && (
        <div>
          {" "}
          <img src="./../../morning.jpeg" alt="dd" />
        </div>
      )}
      {evening && (
        <div>
          <img src="./../../evening.jpg" alt="dd" />
        </div>
      )}
      {night && (
        <div>
          <img src="./../../night.jpg" alt="dd" />
        </div>
      )}
    </div>
  );
}

function Form({
  task,
  setTask,
  addedTaskList,
  setAddedTaskList,
  TIME,

  // handelCheck,
}) {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  function addTask(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      taskName: task,
      time: TIME,
    };
    if (!task) return;
    setAddedTaskList([...addedTaskList, newTask]);
    setTask("");
  }
  return (
    <form onSubmit={addTask}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Write Your task"
        ref={inputEl}
      />
      <button>Add</button>
    </form>
  );
}

function ShowAddedTasks({
  addedTaskList,
  setCheck,
  check,
  handelCheck,
  deleteTaskFunc,
  setShowEditFunc,
}) {
  const [checked, setChecked] = useState(false);
  console.log(checked);
  return (
    <div>
      {addedTaskList?.map((task) => (
        <ul
          className={`tasks__list  ${task.checkS ? `done__ul ` : ""}`}
          key={task.time}
        >
          <input
            onChange={(e) => setChecked(e.target.value)}
            value={checked}
            checked={task.checkS ? "checked" : ""}
            type="checkbox"
            onClick={() => handelCheck(task)}
          />
          <p className={task.checkS ? `done ` : ""}>{task.taskName}</p>
          <p className={task.checkS ? `done ` : ""}>{task.time}</p>
          <p onClick={() => setShowEditFunc(task)} className="edit">
            Edit
          </p>
          <p onClick={() => deleteTaskFunc(task)} className="delete__task">
            ✖
          </p>
        </ul>
      ))}
      <div className="info">
        <p className="parent__color">
          {" "}
          <span className="color_tasks"></span>All tasks {addedTaskList.length}
        </p>
        <p className="parent__color">
          <span className="color_done"></span> Done tasks{" "}
          {addedTaskList.filter((task) => task.checkS).length}
        </p>
      </div>
    </div>
  );
}

function EditForm({ editTask, edit, setEdit, getIdEditing }) {
  const inputEdit = useRef(null);

  useEffect(() => {
    inputEdit.current.focus();
  }, []);

  return (
    <div className="form">
      <input
        type="text"
        value={edit}
        onChange={(e) => setEdit(e.target.value)}
        placeholder="Edit the task"
        ref={inputEdit}
      />
      <button onClick={() => editTask(getIdEditing)}>Save</button>
    </div>
  );
}
