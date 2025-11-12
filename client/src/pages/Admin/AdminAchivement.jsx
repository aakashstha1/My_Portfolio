import { useState, useEffect, useRef } from "react";
import { Modal, Input, message } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function AdminAchievement() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [achievements, setAchievements] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    imgURL: null,
  });

  const fetchAchievements = async () => {
    try {
      const res = await axios.get(`${API_URL}/achievement/get`);
      if (res.data.success) {
        setAchievements(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch achievements");
    }
  };

  const handleAddAchievement = async () => {
    try {
      setLoading(true);
      const payload = new FormData();
      payload.append("title", formData.title);
      if (formData.imgURL) payload.append("imgURL", formData.imgURL);

      const res = await axios.post(`${API_URL}/achievement/add`, payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        resetForm();
        fetchAchievements();
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err.message || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      message.error("Title is required");
      return;
    }
    if (!formData.imgURL) {
      message.error("Image is required");
      return;
    }
    handleAddAchievement();
  };

  const resetForm = () => {
    setShowAddModal(false);
    setFormData({
      title: "",
      imgURL: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const onDelete = (item) => {
    Modal.confirm({
      title: "Are you sure you want to delete this achievement?",
      content: item.title,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await axios.delete(`${API_URL}/achievement/${item._id}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            message.success(res.data.message);
            fetchAchievements();
          } else {
            message.error(res.data.message);
          }
        } catch (err) {
          message.error(err.message || "Delete failed");
        }
      },
    });
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div>
      {/* Add Button */}
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-secondary mb-5 flex items-center gap-4"
          onClick={() => setShowAddModal(true)}
        >
          Add Achievement <i className="fa-regular fa-square-plus text-xl"></i>
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-4 gap-5">
        {achievements.map((achievement) => (
          <div
            key={achievement._id}
            className="shadow border-2 p-5 flex flex-col gap-5 border-silver"
          >
            <h1 className="text-secondary text-xl font-bold flex justify-center">
              {achievement.title}
            </h1>
            <hr />
            <img
              src={achievement.imgURL}
              alt={achievement.title}
              className="h-60 w-80 object-cover mx-auto"
            />
            <div className="flex justify-end mt-5 gap-5">
              <button
                className="bg-red-500 text-white px-4 py-2"
                onClick={() => onDelete(achievement)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        open={showAddModal}
        title="Add Achievement"
        footer={null}
        onCancel={resetForm}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) =>
              setFormData({ ...formData, imgURL: e.target.files[0] })
            }
          />
          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              className="border-primary text-primary px-5 py-2"
              onClick={resetForm}
            >
              CLOSE
            </button>
            <button
              disabled={loading}
              className="bg-primary text-secondary px-5 py-2"
              type="submit"
            >
              {loading ? <LoadingOutlined /> : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AdminAchievement;
