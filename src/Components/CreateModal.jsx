import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";
import { userCreateTask } from "../Services/Apis";

export default function CreateModal({ setLoading, setCreateModal }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function createTask() {
    if (title.trim() === "") {
      toast.warning("Add title");
    } else if (desc.trim() === "") {
      toast.warning("Add description");
    } else {
      setLoading(true);
      const response = await userCreateTask({ title, desc });
      if (response.data) {
        toast.success(`New task created`);
      } else {
        toast.error(`Error creating new task`);
      }
      setLoading(false);
    }
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-96 flex flex-col md:w-[600px] p-5 bg-white rounded-lg font-mono">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm custom-input mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Enter text here"
          type="text"
          id="unique-input"
        />
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="text-sm mb-2 custom-input w-full  px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
          placeholder="Enter text here"
          type="text"
          id="unique-input"
          rows={6}
        />
        <button
          onClick={() => setCreateModal(false)}
          className="bg-white mb-2 text-black px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-900  rounded-full transition ease-in duration-300"
        >
          Cancel
        </button>
        <button
          onClick={createTask}
          className="bg-gray-800 text-white hover:text-black hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-gray-900  rounded-full transition ease-in duration-300"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

CreateModal.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setCreateModal: PropTypes.func.isRequired,
};
