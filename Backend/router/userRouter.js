import express from "express";
import { login, patientRegister, addNewAdmin, getAllDoctor, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } from "../controller/userController.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.js"
const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", addNewAdmin);
router.get("/doctors", getAllDoctor);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);

export default router;   