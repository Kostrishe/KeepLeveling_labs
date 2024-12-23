const express = require("express");
const router = express.Router();
const { getAllUserRoles, getUserRoleById, createUserRole, deleteUserRole } = require("../controllers/userRolesController");

router.get("/", getAllUserRoles);
router.get("/:user_id/:role_id", getUserRoleById);
router.post("/", createUserRole);
router.delete("/:user_id/:role_id", deleteUserRole);

module.exports = router;