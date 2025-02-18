import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db, initDB } from "../db";
import { users } from "../db/schema";

export class UserController {
  async register(req: Request, res: Response) {
    try {
      await initDB();

      const { email, password, name } = req.body;

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const insertResult = await db.insert(users).values({
        email,
        password: hashedPassword,
        name,
      });

      const user = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
        })
        .from(users)
        .where(eq(users.email, email)) // ✅ Correct way to use eq()
        .limit(1);

      res.status(201).json(user[0]); // ✅ Return the inserted user
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating user" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Find user
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Set session
      // req.session.userId = String(user.id);

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
        })
        .from(users);

      console.log(allUsers);

      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  }
}
