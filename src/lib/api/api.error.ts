export class ApiError extends Error {
  constructor(
    public message: string,
    public code: string,
    public details?: Record<string, unknown>,
  ) {
    super(message);
  }
}

//ให้เราไปดู error code ของเราว่าส่งอะไรออกมาบ้าง
// {
//   "message": "The provided data is invalid",
//   "code": "Validation Error",
//   "details": {
//     "password": [
//       "Password must have at least 6 characters"
//     ]
//   }
// }