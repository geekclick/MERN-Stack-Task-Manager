const authRoutes = require("../Components/auth/authRoutes");
const userRoutes = require("../Components/user/userRoutes");
const projectRoutes = require("../Components/project/projectRoutes");
const taskRoutes = require("../Components/task/taskRoutes");
// const chatRoutes = require("../Components/chat/chat-routes");
// const peerRoutes = require("../Components/peer/peer-routes");
// const teamRoutes = require("../Components/team/team-routes");
module.exports = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/tasks", taskRoutes);
    // app.use("/api/chat", chatRoutes);
    // app.use("/api/peer", peerRoutes);
    // app.use("/api/team", teamRoutes);
};
