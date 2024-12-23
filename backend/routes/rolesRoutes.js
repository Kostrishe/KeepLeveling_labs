const express = require("express");
const router = express.Router();
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = require("../controllers/rolesController");

router.get("/", getAllRoles);
router.get("/:role_id", getRoleById);
router.post("/", createRole);
router.put("/:role_id", updateRole);
router.delete("/:role_id", deleteRole);

module.exports = router;