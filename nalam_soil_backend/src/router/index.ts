import { Router } from 'express'
import { requireAppSecret } from '../middleware/authCheck'
import * as controllers from '../controllers'

const router = Router()

router.post('/register', requireAppSecret, controllers.RegisterFarmer)
router.post('/login', requireAppSecret, controllers.LoginFarmer)

export default router;
