import { useContext, useEffect } from "react";
import Task from "../Components/Task";
import TaskDesign from "../Components/TaskDesign";
import { AppContext } from "../Context/AppContext";

function Tasks({}) {
  const { allOwnTask, getOwnTask } = useContext(AppContext);

  useEffect(() => {
    getOwnTask();
  }, [getOwnTask]);



  return (
    <Task>
      {allOwnTask.map((task, index) => (
        <TaskDesign
        
          key={index}
          id={task._id}
          Status={task.status}
          dueDate={task.dueDate}
          description={task.description}
          title={task.title}
        />
      ))}
    </Task>
  );
}

export default Tasks;
