import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "../components/Sidebar";
import SidebarSkeleton from "../components/Skeleton/SidebarSkeleton";
import CurriculumSkeleton from "../components/Skeleton/CurriculumSkeleton";
import ConfirmModal from "../components/ConfirmModel";

import "../css/ManageCurriculum.css";

import { CurriculumContext } from "../Context/CurriculumContext.jsx";

const ManageCurriculum = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toastShown = useRef(false);

  const {
    curriculums,
    curriculumByCount,
    fetchAllCurriculums,
    fetchDeleteCurriculum,
    fetchCurriculumByCount,
  } = useContext(CurriculumContext);

  // Supports both response formats:
  // curriculums = []
  // curriculums = { success: true, curriculum: [] }
  const curriculumList = Array.isArray(curriculums) ? curriculums : [];
  const [loading, setLoading] = useState(true);
  const [showSidebarSkeleton, setShowSidebarSkeleton] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const loadCurriculum = async () => {
      try {
        const [allCurriculumResponse, countResponse] = await Promise.all([
          fetchAllCurriculums(),
          fetchCurriculumByCount(),
        ]);

        console.log("fetchAllCurriculums response:", allCurriculumResponse);
        console.log("fetchCurriculumByCount response:", countResponse);

        const message =
          location.state?.createMessage || location.state?.updateMessage;

        if (message && !toastShown.current) {
          toastShown.current = true;
          toast.success(message);

          navigate(location.pathname, {
            replace: true,
            state: {},
          });
        }
      } catch (error) {
        console.log("Failed to fetch curriculum:", error);
        toast.error("Failed to fetch curriculum");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    loadCurriculum();
  }, []);

  const openDeleteModal = (curriculum) => {
    setSelectedCurriculum(curriculum);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedCurriculum(null);
    setShowDeleteModal(false);
  };

  const handleDeleteCurriculum = async () => {
    if (!selectedCurriculum?._id) return;

    try {
      setDeleteLoading(true);

      const data = await fetchDeleteCurriculum(selectedCurriculum._id);

      toast.dismiss();

      if (data?.success) {
        await Promise.all([
          fetchAllCurriculums(),
          fetchCurriculumByCount(),
        ]);

        toast.success(data.message || "Curriculum deleted successfully!");
        closeDeleteModal();
      } else {
        toast.error(
          data?.errors || data?.message || "Failed to delete curriculum",
        );
      }
    } catch (error) {
      console.log("Error deleting curriculum:", error.message);
      toast.error("Failed to delete curriculum");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} limit={1} />

      <div id="divider" className={collapsed ? "sidebar-collapsed" : ""}>
        <div className="left-sidebar">
          {showSidebarSkeleton ? (
            <SidebarSkeleton />
          ) : (
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          )}
        </div>

        <div className="right-content">
          {loading ? (
            <CurriculumSkeleton curriculumCount={curriculumByCount} />
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="curriculum-manage-container">
                <h2 className="curriculum-manage-heading">
                  Manage Curriculum
                </h2>

                <div className="icon-right">
                  <span className="add-course">Add Curriculum</span>

                  <i
                    className="fa-solid fa-plus add-icon"
                    onClick={() => navigate("/admin/create-curriculum")}
                  ></i>
                </div>

                <div className="curriculum-manage-list">
                  {curriculumList.length > 0 ? (
                    curriculumList.map((item) => (
                      <div className="curriculum-manage-card" key={item._id}>
                        <h3>{item.title}</h3>

                        <p>
                          <strong>Course:</strong>{" "}
                          {item.courseId?.title || "No Course Assigned"}
                        </p>

                        <p>
                          <strong>Lesson Order:</strong>{" "}
                          {item.order ?? "Not set"}
                        </p>

                        <p>
                          <strong>Description:</strong> {item.description}
                        </p>

                        <p>
                          <strong>Duration:</strong> {item.duration}
                        </p>

                        <p>
                          <strong>Preview:</strong>{" "}
                          {item.isPreview ? "Yes" : "No"}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          {item.isPublished === false ? "Hidden" : "Published"}
                        </p>

                        <div className="curriculum-btn-container">
                          <button
                            type="button"
                            className="curriculum-btn"
                            onClick={() =>
                              navigate(`/admin/update-curriculum/${item._id}`)
                            }
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                            Edit
                          </button>

                          <button
                            type="button"
                            className="curriculum-btn"
                            onClick={() => openDeleteModal(item)}
                          >
                            <i className="fa-solid fa-trash"></i>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="curriculum-error">
                      No Curriculum Found
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Curriculum"
        message={
          <>
            Are you sure you want to permanently delete{" "}
            <span className="highlight-course">
              {selectedCurriculum?.title}
            </span>
            ?
          </>
        }
        confirmText="Delete"
        loading={deleteLoading}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteCurriculum}
      />
    </>
  );
};

export default ManageCurriculum;