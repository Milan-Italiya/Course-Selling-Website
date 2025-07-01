const API_BASE_URL = 'http://localhost:5000/api/v1';

export const signupAPI = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/user/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  return {
    ok: res.ok,                         // true if status is 200-299
    status: res.status,
    message: data.message,             // optional success message
    errors: data.errors || data.error || [], // handle both array or single string
  };
};

export const loginAPI = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json()
  console.log("data information : ",data)
  return {
    ok:response.ok,
    status:response.status,
    message:data.message,
    errors:data.errors || data.errors || [],
    token:data.token,
    user:data.user
  }
}

