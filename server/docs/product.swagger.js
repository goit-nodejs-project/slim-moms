/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product search and calorie calculation operations
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Search products by name
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name to search (case-insensitive)
 *         example: apple
 *     responses:
 *       200:
 *         description: Matching products returned (up to 10 results)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   calories:
 *                     type: number
 *                   groupBloodNotAllowed:
 *                     type: object
 *       400:
 *         description: Query parameter is missing
 */

/**
 * @swagger
 * /api/products/public:
 *   post:
 *     summary: Calculate daily calories and not recommended products without authentication
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - desiredWeight
 *               - age
 *               - bloodType
 *             properties:
 *               height:
 *                 type: number
 *                 example: 165
 *                 description: Height in cm
 *               desiredWeight:
 *                 type: number
 *                 example: 60
 *                 description: Target weight in kg
 *               age:
 *                 type: number
 *                 example: 25
 *               bloodType:
 *                 type: number
 *                 example: 2
 *                 description: Blood type (1, 2, 3, or 4)
 *     responses:
 *       200:
 *         description: Daily calories and not recommended products calculated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyCalories:
 *                   type: number
 *                   example: 1200
 *                 notRecommendedProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid or missing parameters
 */

/**
 * @swagger
 * /api/products/private:
 *   post:
 *     summary: Calculate daily calories and save the result to the authenticated user's profile
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - desiredWeight
 *               - age
 *               - bloodType
 *             properties:
 *               height:
 *                 type: number
 *                 example: 165
 *                 description: Height in cm
 *               desiredWeight:
 *                 type: number
 *                 example: 60
 *                 description: Target weight in kg
 *               age:
 *                 type: number
 *                 example: 25
 *               bloodType:
 *                 type: number
 *                 example: 2
 *                 description: Blood type (1, 2, 3, or 4)
 *     responses:
 *       200:
 *         description: Daily calories calculated and saved to user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyCalories:
 *                   type: number
 *                   example: 1200
 *                 notRecommendedProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid or missing parameters
 *       401:
 *         description: Unauthorized
 */
