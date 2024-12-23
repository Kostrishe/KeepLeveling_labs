const express = require("express");

const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(cors());


const serverStatusRoutes = require("./routes/serverStatusRoutes");
const usersRoutes = require("./routes/usersRoutes");
const userProfilesRoutes = require("./routes/userProfilesRoutes");
const rolesRoutes = require("./routes/rolesRoutes");
const userRolesRoutes = require("./routes/userRolesRoutes");
const serversRoutes = require("./routes/serversRoutes");
const mapsRoutes = require("./routes/mapsRoutes");
const mapReviewsRoutes = require("./routes/mapReviewsRoutes");
const mapCommentsRoutes = require("./routes/mapCommentsRoutes");
const mapFilesRoutes = require("./routes/mapFilesRoutes");
const mapBugReportsRoutes = require("./routes/mapBugReportsRoutes");
const playtestsRoutes = require("./routes/playtestsRoutes");
const playtestParticipantsRoutes = require("./routes/playtestParticipantsRoutes");
const tagsRoutes = require("./routes/tagsRoutes");
const mapTagsRoutes = require("./routes/mapTagsRoutes");
const playtestTagsRoutes = require("./routes/playtestTagsRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const logsRoutes = require("./routes/logsRoutes");
const bugCategoriesRoutes = require("./routes/bugCategoriesRoutes");
const mapBugReportCategoriesRoutes = require("./routes/mapBugReportCategoriesRoutes");

app.use("/api/server-status", serverStatusRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/user-profiles", userProfilesRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/user-roles", userRolesRoutes);
app.use("/api/servers", serversRoutes);
app.use("/api/maps", mapsRoutes);
app.use("/api/map-reviews", mapReviewsRoutes);
app.use("/api/map-comments", mapCommentsRoutes);
app.use("/api/map-files", mapFilesRoutes);
app.use("/api/map-bug-reports", mapBugReportsRoutes);
app.use("/api/playtests", playtestsRoutes);
app.use("/api/playtest-participants", playtestParticipantsRoutes);
app.use("/api/tags", tagsRoutes);
app.use("/api/map-tags", mapTagsRoutes);
app.use("/api/playtest-tags", playtestTagsRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/bug-categories", bugCategoriesRoutes);
app.use("/api/map-bug-report-categories", mapBugReportCategoriesRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT}`);
});