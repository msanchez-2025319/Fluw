export interface JwtPayload {
  id: string;
  role: "ADMIN" | "USER";
}

export interface LoginRequestBody {
  email: string;
  password: string;
}