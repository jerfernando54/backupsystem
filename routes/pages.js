var express = require('express');
var router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pages:
 *       type: object
 *       required:
 *            none
 *       properties:
 */

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: The pages managing API
 * /page:
 *   get:
 *     summary: get backup page
 *     tags: [Pages]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pages'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pages'
 *       500:
 *         description: Some server error
 *
 */

router.post('/', (req, res, next)=> {
  res.send('respond with a resource');
});


module.exports = router;