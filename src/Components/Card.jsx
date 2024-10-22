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
  reload
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
      setReload(!reload)
      toast.success(`${task.title} updated`);
    } else {
      toast.error(`Error creating new task`);
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:pl-8 1290px:grid-cols-5">
        {tasks.map((task, index) => (
          <>
            <div
              key={index}
              className={`card ${
                task.status === true
                  ? "bg-[rgb(2,48,32)]"
                  : "bg-[rgb(139,128,0)]"
              }`}
            >
              <div className="text" onClick={() => detailsModal(task)}>
                <span>{task.title}</span>
                <p className="subtitle text-white">{task.description}</p>
              </div>
              <div className="icons">
                <a className="btn" onClick={() => editFormModal(task)}>
                  <RiEditFill className="hover:text-gray-800 text-2xl" />
                </a>
                <a className="btn" onClick={() => updateTask(task, task.id)}>
                  <input
                    type="checkbox"
                    checked={task.status}
                    className="appearance-none w-5 h-5 bg-gray-200 border-2 border-gray-400 rounded-md checked:bg-green-500 checked:border-green-800"
                  />
                </a>
                <a className="btn" onClick={() => deleteModal(task.id)}>
                  <MdDelete className="hover:text-gray-800 text-2xl" />
                </a>
              </div>
            </div>
          </>

          //       <div
          //         key={index}
          //         className={`${task.status === true ? "bg-green-100" : "bg-yellow-100"} cursor-pointer overflow-hidden relative sm:w-76 lg:w-72
          //      transition-all duration-500 hover:translate-y-2 w-full h-44 rounded-lg shadow-xl flex flex-col
          //  items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500
          //   before:-top-1 before:h-1 before:bg-gray-700`}
          //       >
          //         <div className="flex justify-evenly w-full text-3xl">
          //           <RiEditFill
          //             className="hover:text-gray-800"
          //             onClick={() => editFormModal(task)}
          //           />
          //           <input type="checkbox" className="w-36" checked={task.status}/>
          //           <MdDelete
          //             className="hover:text-gray-800"
          //             onClick={() => deleteModal(task.id)}
          //           />
          //         </div>
          //         <div onClick={() => detailsModal(task)} className="flex flex-col justify-center items-center">
          //           <span className="font-bold text-3xl">{task.title}</span>
          //           <p className="truncate max-w-[26ch] text-xl p-4">{task.description}</p>
          //         </div>
          //       </div>
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
  reload: PropTypes.bool.isRequired
};
