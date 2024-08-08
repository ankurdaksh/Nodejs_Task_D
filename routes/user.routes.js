import express from 'express';

import { saveFormData, updateUserProfile } from '../controllers/user.controller.js';
import { validateToken } from '../JWT/JWT.js';
import upload from "../utils/upload.js";
import { validateUser } from '../validation/user.validation.js';

const router = express.Router();

router.route("/save-user-form").post( upload.any("images"),validateUser, saveFormData);
router.route("/update-self-profile").patch( validateToken, updateUserProfile);




export default router;

