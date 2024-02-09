

export async function LoginRequest(data: {
  email?: string;
  password?: string;
}) {
  try {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}

export async function RegisterRequest(data: {
  username?: string;
  email?: string;
  password?: string;
}) {
  try {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
