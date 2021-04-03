const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jws = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'minLenght = 6').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации',
                });
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res
                    .status(400)
                    .json({ message: 'User is already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();
            res.status(201).json({ message: 'Пользователь создан' });
        } catch (err) {
            res.status(500).json({
                message: `Что-то пошло не так. ${err.message}`,
            });
        }
    }
);

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему',
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email: email });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'Пользователь не найден' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Неверный пароль или email, попробуйте снова',
                });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );
            res.json({ token, userId: user.id });
        } catch (err) {
            res.status(500).json({
                message: `Что-то пошло не так. ${err.message}`,
            });
        }
    }
);

module.exports = router;
