import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import {
  statusFilter,
  userTasks,
  userTaskDetails,
} from "../Services/Apis";
import { toast } from "sonner";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import DeleteModal from "../Components/DeleteModal";
import DetailModal from "../Components/DetailModal";
import EditModal from "../Components/EditModal";
import CreateModal from "../Components/CreateModal";
import { Button } from "@material-tailwind/react";
import { FaFilter, FaPlus } from "react-icons/fa";

export default function TaskList() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });
  const [editModal, setEditModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      const response = await userTasks();
      if (response.data) {
        setTasks(response.data);
      } else {
        toast.error("Error fetching tasks");
      }
      setLoading(false);
    }
    fetchTasks();
  }, [editModal, deleteModal, createModal]);

  async function filteredTasks(status) {
    setLoading(true);
    const response = await statusFilter(status);
    if (response.data) {
      setTasks(response.data);
    } else {
      toast.error(`Error fetching ${status} tasks`);
    }
    setLoading(false);
  }

  async function fetchTaskDetails(task_id) {
    setLoading(true);
    const response = await userTaskDetails(task_id);
    if (response.data) {
      setTaskDetails(response.data);
    } else {
      toast.error(`Error fetching task details`);
    }
    setLoading(false);
  }

  async function showEditModal(task) {
    setEditModal(true);
    setTaskDetails(task);
  }
  async function showDeleteModal(task_id) {
    setTaskToDelete(task_id);
    setDeleteModal(true);
  }
  async function showDetailModal(task) {
    setDetailModal(true);
    // setTaskDetails(task);
    fetchTaskDetails(task.id);
  }

  return (
    <Layout>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BeatLoader color="#858585" size={30} />
        </div>
      )}
      <div className="flex justify-center p-4 gap-2">
        <Button
          onClick={() => setCreateModal(true)}
          className="flex gap-4 text-md bg-[#dfddd5] hover:bg-gray-700 text-black hover:text-white"
        >
          {" "}
          <FaPlus className="text-xl" />
          Create Task
        </Button>
        <Button className="flex gap-4 text-md bg-[#dfddd5] hover:bg-gray-700 text-black hover:text-white">
          {" "}
          <FaFilter className="text-xl" />
          Filter
        </Button>
      </div>

      <Card
        detailsModal={showDetailModal}
        deleteModal={showDeleteModal}
        editFormModal={showEditModal}
        tasks={tasks}
      />

      {deleteModal && (
        <DeleteModal
          setLoading={setLoading}
          setDeleteModal={setDeleteModal}
          task_id={taskToDelete}
        />
      )}
      {detailModal && (
        <DetailModal task={taskDetails} setDetailModal={setDetailModal} />
      )}

      {editModal && (
        <EditModal
          setEditModal={setEditModal}
          task={taskDetails}
          setTaskDetails={setTaskDetails}
          setLoading={setLoading}
        />
      )}

      {createModal && (
        <CreateModal setCreateModal={setCreateModal} setLoading={setLoading} />
      )}
    </Layout>
  );
}
