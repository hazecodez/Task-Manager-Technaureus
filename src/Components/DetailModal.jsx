import PropTypes from "prop-types";
import { MdOutlineDoneOutline, MdOutlinePending } from "react-icons/md";

export default function DetailModal({ task, setDetailModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        onClick={() => setDetailModal(false)}
        className="bg-white w-80 p-5 h-fit shadow-md relative rounded-md"
      >
        <button
          className={`${
            task.status ? "bg-green-200" : "bg-yellow-200"
          }  rounded-full px-3 py-1 absolute right-2 text-sm`}
        >
          {task.status ? (
            <MdOutlineDoneOutline className="text-xl text-green-700" />
          ) : (
            <MdOutlinePending className="text-xl text-yellow-700" />
          )}
        </button>

        <p className="text-lg font-bold font-sans">{task.title}</p>
        <div className="text-sm py-2 font-mono">{task.description}</div>
      </div>
    </div>
  );
}

DetailModal.propTypes = {
  task: PropTypes.object.isRequired,
  setDetailModal: PropTypes.func.isRequired,
};
