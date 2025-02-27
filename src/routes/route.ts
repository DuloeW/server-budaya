import 'dotenv/config'
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { type Variables } from '../utils/tool.js'
import { logger } from 'hono/logger';
import { getCookie } from 'hono/cookie';
import { bearerAuth } from 'hono/bearer-auth';

import authRoute from './auth.route.js'
import userRoute from './user.route.js'
import categoryRoute from './category.route.js';
import summaryRoute from './summary.route.js';

const router = new Hono<{Variables: Variables}>

router.use(prettyJSON())
router.use(logger())


const BASE_URL = '/api'
const BASE_URL_AUTH = '/api/auth'


//MIDDLEWARE
router.use(`${BASE_URL_AUTH}/*`, 
    bearerAuth({
        verifyToken: async (token, c) => {
            return token === getCookie(c, 'token')
        }
    })
)

router.route(`${BASE_URL}/`, authRoute)
router.route(`${BASE_URL_AUTH}/`, userRoute)
router.route(`${BASE_URL_AUTH}/`, categoryRoute)
router.route(`${BASE_URL_AUTH}/`, summaryRoute)

export default router