import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

export default function Card({
  tasks,
  editFormModal,
  detailsModal,
  deleteModal,
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:pl-8 1290px:grid-cols-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`bg-[#dfddd5] cursor-pointer overflow-hidden relative sm:w-76 lg:w-72
         transition-all duration-500 hover:translate-y-2 w-full h-44 rounded-lg shadow-xl flex flex-col
     items-center justify-evenly gap-2 p-2 before:absolute before:w-full hover:before:top-0 before:duration-500
      before:-top-1 before:h-1 before:bg-gray-700`}
          >
            <div className="flex justify-around w-full text-xl">
              <RiEditFill
                className="hover:text-gray-800"
                onClick={() => editFormModal(task)}
              />
              <MdDelete
                className="hover:text-gray-800"
                onClick={() => deleteModal(task.id)}
              />
            </div>
            <div onClick={() => detailsModal(task)}>
              <span className="font-bold">{task.title}</span>
              <p className="line-clamp-3">{task.description}</p>
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
};
