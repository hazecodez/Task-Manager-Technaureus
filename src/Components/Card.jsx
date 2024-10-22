import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";
import "./Card/card.css";
import { userUpdateTask } from "../Services/Apis";
import { toast } from "sonner";

export default function Card({
  tasks,
  editFormModal,
  detailsModal,
  deleteModal,
  setReload,
  reload,
}) {
  async function updateTask(task, taskId) {
    const updatedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: !task.status,
    };
    const response = await userUpdateTask(updatedTask, taskId);
    if (response.data) {
      setReload(!reload);
      toast.success(`${task.title} updated`);
    } else {
      toast.error(`Error creating new task`);
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:pl-8 1290px:grid-cols-5">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`card ${
              task.status === true ? "bg-[rgb(2,48,32)]" : "bg-[rgb(139,128,0)]"
            }`}
          >
            <div className="text" onClick={() => detailsModal(task)}>
              <span>{task.title}</span>
              <p className="subtitle text-white line-clamp-3">
                {task.description}
              </p>
            </div>
            <div className="icons flex w-full justify-evenly">
              <a className="btn w-full" onClick={() => editFormModal(task)}>
                <RiEditFill className="hover:text-gray-800 text-2xl" />
              </a>
              <a
                className="btn w-full"
                onClick={() => updateTask(task, task.id)}
              >
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={() => updateTask(task, task.id)}
                  className="appearance-none w-5 h-5 bg-gray-200 border-2 border-gray-400 rounded-md checked:bg-green-500 checked:border-green-800"
                />
              </a>
              <a className="btn w-full" onClick={() => deleteModal(task.id)}>
                <MdDelete className="hover:text-gray-800 text-2xl" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

Card.propTypes = {
  tasks: PropTypes.array.isRequired,
  editFormModal: PropTypes.func.isRequired,
  detailsModal: PropTypes.func.isRequired,
  deleteModal: PropTypes.func.isRequired,
  setReload: PropTypes.func.isRequired,
  reload: PropTypes.bool.isRequired,
};
