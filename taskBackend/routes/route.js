const passport = require("passport");
const express = require("express");
const route = express.Router();

const {signup , login} = require("../controllers/auth");

const {createTask ,deleteTask,getAllOwnTask,getTaskByUser  , getAllTask, getAllUserEmail,getAllCompletedTask,getAllCompleteTask ,updateTask, getPendingTask , getTaskById} = require("../controllers/task")


route.post("/signup" , signup);
route.post("/login",login);

route.post("/create/task" ,passport.authenticate('jwt', { session: false }), createTask);

route.put("/update/task" ,passport.authenticate('jwt', { session: false }), updateTask);
route.get("/getAllTask" ,passport.authenticate('jwt', { session: false }), getAllTask);
route.get("/getTaskById/:taskId" ,passport.authenticate('jwt', { session: false }), getTaskById);
route.get("/getAllCompleteTask" ,passport.authenticate('jwt', { session: false }), getAllCompleteTask);
route.get("/getAllPendingTask" ,passport.authenticate('jwt', { session: false }), getPendingTask);
route.get("/getAllOwnTask" ,passport.authenticate('jwt', { session: false }),  getAllOwnTask);
route.get("/getTaskByUserEmail/:userEmail",passport.authenticate('jwt', { session: false }), getTaskByUser);
route.get("/getAllUserEmail",passport.authenticate('jwt', { session: false }), getAllUserEmail);
route.get("/getAllCompletedTask",passport.authenticate('jwt', { session: false }), getAllCompletedTask);

route.delete("/delete/task/:taskId" ,passport.authenticate('jwt', { session: false }),deleteTask);

module.exports = route;
