/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User registration and authentication operations
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Duhan
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User successfully created
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive an access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/auth/current:
 *   get:
 *     summary: Get the currently authenticated user's information
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized — invalid or missing token
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out and end the current session
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Session ended successfully
 *       401:
 *         description: Unauthorized
 */
