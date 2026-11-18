const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface AuthResponse {
  user: User;
  accessToken: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fields?: Record<string, string[]>,
  ) {
    super(message);
  }
}

// Access token lives in memory only (never localStorage). The refresh token is
// an httpOnly cookie the server sets, so JavaScript cannot read it.
let accessToken: string | null = null;

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}/api/auth${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error ?? "Request failed", res.status, data.fields);
  return data as T;
}

function remember(r: AuthResponse) {
  accessToken = r.accessToken;
  return r.user;
}

export const auth = {
  register: (b: { name: string; email: string; password: string }) =>
    post<AuthResponse>("/register", b).then(remember),
  login: (b: { email: string; password: string }) =>
    post<AuthResponse>("/login", b).then(remember),
  refresh: () => post<AuthResponse>("/refresh").then(remember),
  logout: async () => {
    await post("/logout");
    accessToken = null;
  },
  getAccessToken: () => accessToken,
};
