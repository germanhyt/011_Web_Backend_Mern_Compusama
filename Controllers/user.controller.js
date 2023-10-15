import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import generateToken from "../utils/generateToken.js";


const postLoginUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ "email": email });
        const validatedPassword = await user.comparePassword(password);

        if (!user && !validatedPassword) {
            return res.status(401).json({ error: 'Email o Password es inválido' });
        }
        user.password=req.body.password;
        try {
            const loginUser = {
                _id: user._id,
                email: user.email,
                name: user.name,
                is_available: user.is_available,
                sesion_token: generateToken(user._id),
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            };

            return res.json(loginUser);
        } catch (error) {
            return res.status(401).json({ message: 'Email o Password es inválido', error: error.message });
        }

    }
);

const postRegisterUser = asyncHandler(
    async (req, res) => {

        const { email, password, name } = req.body;
        const userExist = await User.findOne({ "email": email });
        if (userExist) {
            res.status(400).json({ error: 'El usuario ya existe' });
        }

        try {
            const new_user = new User({
                email,
                password,
                name,
                created_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
            });

            const created_user = await new_user.save();
            const session_token = generateToken(created_user._id);

            return res.status(201).json({ "token": session_token });

        } catch (error) {
            return res.status(400).json({ message: 'Data de Usuario inválido', error: error.message });
        }

    }
);


const getProfileUser = asyncHandler(

    async (req, res) => {
        const user = await User.findById(req.user._id);

        try {
            const userProfile = {
                id: user._id,
                email: user.email,
                name: user.name,
                created_at: user.created_at
            };

            res.json(userProfile);

        } catch (error) {
            return res.status(404).json({ message: 'User Not Found', error: error.message });
        }

    }
);

const putProfileUser = asyncHandler(
    async (req, res) => {
        const user = User.findById(req.user._id);

        try {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.created_at = user.created_at

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updateUser = await user.save();
            req.json({
                _id: updateUser._id,
                email: updateUser.email,
                name: updateUser.name,
                created_at: updateUser.created_at,
                updated_at: new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' }),
                token: generateToken(updateUser._id),
            });

        } catch (error) {
            return res.status(404).json({ message: 'User Not Found', error: error.message });
        }
    }
);


const getUsers = asyncHandler(
    async (req, res) => {

        try {
            const users = await User.find({});
            // console.log(users)
            return res.json(users);

        } catch (error) {
            return res.status(404).json({ message: 'User Not Found', error: error.message });
        }
    }
);


export { postLoginUser, postRegisterUser, getProfileUser, putProfileUser, getUsers };