export async function LoginRequest(data: {
  email?: string;
  password?: string;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();

    if (res.status === 200) return { success: true, data: response };
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.status === 200) return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
