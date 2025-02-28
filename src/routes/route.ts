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
import homeImageRoute from './homeImage.route.js';

const router = new Hono<{Variables: Variables}>

router.use(prettyJSON())
router.use(logger())


const BASE_URL = '/api'
const BASE_URL_AUTH = '/api/auth'


//MIDDLEWARE
router.use(`${BASE_URL_AUTH}/*`, async (c, next) => {
    if (c.req.method !== 'GET') {
        return bearerAuth({
            verifyToken: async (token, c) => {
                return token === getCookie(c, 'token')
            }
        })(c, next)
    }
    await next()
})

router.route(`${BASE_URL}/`, authRoute)
router.route(`${BASE_URL_AUTH}/`, userRoute)
router.route(`${BASE_URL_AUTH}/`, categoryRoute)
router.route(`${BASE_URL_AUTH}/`, summaryRoute)
router.route(`${BASE_URL_AUTH}/`, homeImageRoute)

export default router