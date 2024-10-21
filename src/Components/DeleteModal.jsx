import PropTypes from "prop-types";
import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteModal({ deleteTask, task_id, setDeleteModal }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl">
        <div>
          <div className="text-center p-3 flex-auto justify-center items-center">
            <RiDeleteBinLine className="text-2xl text-red-600" />
            <h2 className="text-xl font-bold py-4 text-gray-200">
              Are you sure?
            </h2>
            <p className="font-bold text-sm text-gray-500 px-2">
              Do you really want to continue? This process cannot be undone.
            </p>
          </div>
          <div className="p-2 mt-2 text-center space-x-1 md:block">
            <button
              onClick={() => setDeleteModal(false)}
              className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => deleteTask(task_id)}
              className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task_id: PropTypes.string.isRequired,
  setDeleteModal: PropTypes.func.isRequired,
};
