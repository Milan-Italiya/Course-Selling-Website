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