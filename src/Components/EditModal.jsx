import PropTypes from "prop-types";
import { userUpdateTask } from "../Services/Apis";
import { toast } from "sonner";

export default function EditModal({
  task,
  setEditModal,
  setTaskDetails,
  setLoading,
}) {
  async function updateTask() {
    setLoading(true);
    const response = await userUpdateTask(task, task.id);
    if (response.data) {
      toast.success(`Task updated`);
      setEditModal(false);
    } else {
      toast.error(`Error creating new task`);
    }
    setLoading(false);
  }

  const handleInputChange = (field, value) => {
    setTaskDetails((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-96 flex flex-col md:w-[600px] p-5 bg-white rounded-lg font-mono">
        <div className="flex justify-end m-6">
          <input
            className="peer w-8 h-8 "
            id="tick"
            name="tick"
            type="checkbox"
            checked={task.status}
            onChange={(e) => handleInputChange("status", e.target.checked)}
          />
        </div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          value={task.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="text-sm custom-input mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Enter text here"
          type="text"
          id="unique-input"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={task.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="text-sm mb-2 custom-input w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Enter text here"
          type="text"
          id="unique-input"
          rows={6}
        />
        <button
          onClick={() => setEditModal(false)}
          className="bg-white mb-2 text-black px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-900  rounded-full transition ease-in duration-300"
        >
          Cancel
        </button>
        <button
          onClick={updateTask}
          className="bg-gray-800 text-white hover:text-black hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-900  rounded-full transition ease-in duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

EditModal.propTypes = {
  task: PropTypes.object.isRequired,
  setEditModal: PropTypes.func.isRequired,
  setTaskDetails: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
