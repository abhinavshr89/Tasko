import express from 'express';
import { createTodo,getTodos, updateTodo, deleteTodo } from '../controller/todo.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();    

router.post("/create", isAuthenticated, createTodo);
router.get("/get", isAuthenticated, getTodos);
router.put("/update", isAuthenticated ,updateTodo); 
router.delete("/delete/:id", isAuthenticated,  deleteTodo);





export default router;