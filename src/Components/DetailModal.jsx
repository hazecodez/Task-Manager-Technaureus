import PropTypes from "prop-types";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function DetailModal({ task,setDetailModal }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center bg-gray-800 w-96 h-72 rounded-md md:w-[500px]">
      <IoCloseCircleSharp onClick={()=> setDetailModal(false)} className="mt-8 text-2xl text-white hover:text-gray-600" />
        <h4 className="text-2xl text-gray-100 font-semibold pt-4 underline">
          {task.title}
        </h4>
        <h4 className="text-xl text-gray-100 font-normal pt-8">
          {task.description}
        </h4>
      </div>
    </div>
  );
}


DetailModal.propTypes = {
    task: PropTypes.object.isRequired,
    setDetailModal: PropTypes.func.isRequired
}