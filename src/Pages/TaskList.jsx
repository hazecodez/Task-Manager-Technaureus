import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import {
  statusFilter,
  userTasks,
  userTaskDetails,
  userUpdateTask,
} from "../Services/Apis";
import { toast } from "sonner";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import DeleteModal from "../Components/DeleteModal";
import DetailModal from "../Components/DetailModal";
import EditModal from "../Components/EditModal";
import CreateModal from "../Components/CreateModal";
import {
  Button,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [reload, setReload] = useState(false);

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
  }, [editModal, deleteModal, createModal, reload]);

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

  async function updateStatus(task, taskId) {
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

  async function showCreatelModal() {
    setCreateModal(true);
  }

  return (
    <Layout>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <BeatLoader color="#858585" size={30} />
        </div>
      )}
      <div className="flex justify-end p-4 gap-2">
        <Button
          onClick={showCreatelModal}
          className="flex gap-4 text-md bg-[#dfddd5] hover:bg-gray-700 text-black hover:text-white"
        >
          {" "}
          <FaPlus className="text-xl" />
          Create Task
        </Button>
        {/* <Button
          onClick={filteredTasks}
          className="flex gap-4 text-md bg-[#dfddd5] hover:bg-gray-700 text-black hover:text-white"
        >
          {" "}
          <FaFilter className="text-xl" />
          Filter
          
        </Button> */}

        <Menu
          open={isFilterOpen}
          handler={setIsFilterOpen}
          offset={{ mainAxis: 20 }}
          placement="bottom"
          allowHover={true}
        >
          <MenuHandler className="flex rounded-md gap-4  bg-[#dfddd5] hover:bg-gray-700 text-black hover:text-white">
            <Typography as="div" variant="small">
              <ListItem
                className="flex items-center gap-2 py-2 pr-4 text-lg font-bold uppercase text-gray-900"
                selected={isFilterOpen}
              >
                Filter
                <FaFilter className="text-xl" />
              </ListItem>
            </Typography>
          </MenuHandler>
          <MenuList className=" w-[240px] rounded-xl lg:block">
            <ul className="grid grid-cols gap-y-2 outline-none outline-0">
              <a
                onClick={() => {
                  filteredTasks("completed"), setFilterStatus("completed");
                }}
              >
                <MenuItem className="flex items-center gap-3 rounded-lg">
                  <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                    <input
                      type="checkbox"
                      checked={filterStatus === "completed"}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="flex items-center text-sm font-bold"
                    >
                      Completed
                    </Typography>
                  </div>
                </MenuItem>
              </a>
              <a
                onClick={() => {
                  filteredTasks("pending");
                  setFilterStatus("pending");
                }}
              >
                <MenuItem className="flex items-center gap-3 rounded-lg">
                  <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                    <input
                      type="checkbox"
                      checked={filterStatus === "pending"}
                    />
                  </div>
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="flex items-center text-sm font-bold"
                    >
                      Pending
                    </Typography>
                  </div>
                </MenuItem>
              </a>
              {/* <a onClick={()=> {
                setFilterStatus("")
              }}>
                <MenuItem className="flex items-center gap-3 rounded-lg">
                  <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                  <input type="checkbox" checked={filterStatus === ""} />
                  </div>
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="flex items-center text-sm font-bold"
                    >
                      All
                    </Typography>
                  </div>
                </MenuItem>
              </a> */}
            </ul>
          </MenuList>
        </Menu>
      </div>

      <Card
        detailsModal={showDetailModal}
        deleteModal={showDeleteModal}
        editFormModal={showEditModal}
        tasks={tasks}
        setReload={setReload}
        reload={reload}
      />

      {deleteModal && (
        <DeleteModal
          setLoading={setLoading}
          setDeleteModal={setDeleteModal}
          task_id={taskToDelete}
        />
      )}
      {detailModal && (
        <DetailModal
          task={taskDetails}
          setDetailModal={setDetailModal}
          updateStatus={updateStatus}
        />
      )}

      {editModal && (
        <EditModal
          setEditModal={setEditModal}
          task={taskDetails}
          setTaskDetails={setTaskDetails}
          setLoading={setLoading}
          loading={loading}
        />
      )}

      {createModal && (
        <CreateModal
          setCreateModal={setCreateModal}
          setLoading={setLoading}
          loading={loading}
        />
      )}
    </Layout>
  );
}
