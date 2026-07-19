import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "../css/Users.css";
import Sidebar from "../components/Sidebar";
import SidebarSkeleton from "../components/Skeleton/SidebarSkeleton";
import UserSkeleton from "../components/Skeleton/UserSkeleton";
import ConfirmModal from "../components/ConfirmModel";

const ManageUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    fetchUsers,
    user,
    userByCount,
    fetchUsersByCount,
    fetchDeleteUser,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [showSidebarSkeleton, setShowSidebarSkeleton] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        await fetchUsers();
        await fetchUsersByCount();

        setTimeout(() => {
          setLoading(false);
        }, 1500);

        if (location.state?.createMessage || location.state?.updateMessage) {
          toast.success(location.state.createMessage || location.state?.updateMessage);
          navigate(location.pathname, { replace: true });
        }
      } catch (error) {
        console.log("Failed to fetch users:", error.message);
        toast.error("Failed to fetch users");
      }
    };

    loadUsers();
  }, []);

  const openDeleteModal = (userData) => {
    setSelectedUser(userData);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser?._id) return;

    try {
      setDeleteLoading(true);

      const data = await fetchDeleteUser(selectedUser._id);

      toast.dismiss();

      if (data?.success) {
        toast.success(data.message || "User deleted successfully!");
        closeDeleteModal();
      } else {
        toast.error(data?.errors || data?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error.message);
      toast.error("Failed to delete user");
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
            <UserSkeleton countUser={userByCount || 6} />
          ) : (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="user-container">
                <h2 className="user-heading">Users</h2>

                <div className="user-list">
                  {user.length > 0 ? (
                    user.map((userData) => (
                      <div className="user-card" key={userData._id}>
                        <h3>{userData.name}</h3>

                        <p>
                          <strong>Name:</strong>{" "}
                          {userData.firstName + " " + userData.lastName}
                        </p>

                        <p>
                          <strong>Email:</strong> {userData.email}
                        </p>

                        <div className="user-btn-container">
                          <button
                            type="button"
                            className="user-btn"
                            onClick={() =>
                              navigate(`/admin/update/${userData._id}`)
                            }
                          >
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </button>

                          <button
                            type="button"
                            className="user-btn"
                            onClick={() => openDeleteModal(userData)}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="user-error">No users found</div>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete User"
        message={
          <>
            Are you sure you want to permanently delete{" "}
            <span className="highlight-course">
              {selectedUser?.firstName} {selectedUser?.lastName}
            </span>
            ?
          </>
        }
        confirmText="Delete"
        loading={deleteLoading}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteUser}
      />
    </>
  );
};

export default ManageUsers;