/**
 * @swagger
 * tags:
 *   name: Diary
 *   description: Daily food tracking operations
 */

/**
 * @swagger
 * /api/diary:
 *   post:
 *     summary: Add a product to the diary
 *     tags: [Diary]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - productId
 *               - weight
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2024-01-15"
 *                 description: Date in YYYY-MM-DD format
 *               productId:
 *                 type: string
 *                 example: "5d51694902b2373622ff5770"
 *               weight:
 *                 type: number
 *                 example: 150
 *                 description: Amount in grams (must be greater than 0)
 *     responses:
 *       200:
 *         description: Product successfully added to the existing day record
 *       201:
 *         description: New day record created and product added
 *       400:
 *         description: Invalid date format or missing/invalid fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/diary/{dayInfoId}/{productId}:
 *   delete:
 *     summary: Remove a product from the diary
 *     tags: [Diary]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayInfoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the day record
 *         example: "64a1b2c3d4e5f6a7b8c9d0e1"
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the eaten product entry within the day record
 *         example: "64a1b2c3d4e5f6a7b8c9d0e2"
 *     responses:
 *       200:
 *         description: Product successfully removed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access to this record is forbidden
 *       404:
 *         description: Day record or product entry not found
 */

/**
 * @swagger
 * /api/diary/{date}:
 *   get:
 *     summary: Get food and summary information for a specific day
 *     tags: [Diary]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: Date in YYYY-MM-DD format
 *         example: "2024-01-15"
 *     responses:
 *       200:
 *         description: Day information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dayInfo:
 *                   type: object
 *                   description: Eaten products and daily summary
 *                 dailyCalories:
 *                   type: number
 *                   example: 1200
 *                 left:
 *                   type: number
 *                   example: 800
 *                 percentOfNormal:
 *                   type: number
 *                   example: 33
 *                 notRecommendedProducts:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized
 */
