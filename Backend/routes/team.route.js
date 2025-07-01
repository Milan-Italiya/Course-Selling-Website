import express from "express"
import { CreateTeam, DeleteTeam, GetTeams, UpdateTeam } from "../controllers/team.controller.js"
import adminMiddleware from "../middlewares/admin.middleware.js"
const router = express.Router()

router.post('/create', adminMiddleware, CreateTeam)
router.get('/members', GetTeams)
router.post('/update', adminMiddleware, UpdateTeam)
router.post('/delete', adminMiddleware, DeleteTeam)

export default router