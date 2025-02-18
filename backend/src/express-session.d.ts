import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: string; // or number, depending on your user ID type
  }
}
