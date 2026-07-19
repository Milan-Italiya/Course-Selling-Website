export const getUsersByCount = async () => {
    const response = await fetch('http://localhost:5000/api/v1/user/users');
    const data = await response.json();
    console.log("data in getuserdatasourse: ", data);
    return data.users;
}
export const getUsers = async () => {
    const response = await fetch('http://localhost:5000/api/v1/user/users');
    const data = await response.json();
    console.log("data in getuserdatasourse: ", data);
    return data.users;
}

export const getUserById = async (userId) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/api/v1/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const deleteUserData = async (userId) => {
    const token = sessionStorage.getItem("token");

    try {
        const response = await fetch(
            `http://localhost:5000/api/v1/user/delete/${userId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        return data
    } catch (error) {
        console.log("Error deleting user:", error.message);
        throw error;
    }
};

export const updateUserData = async (userId, userData) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/v1/user/update/${userId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();
  return data;
};