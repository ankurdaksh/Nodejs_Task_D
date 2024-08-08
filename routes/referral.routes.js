// routes/referrals.js
import express from 'express';
import { createReferral, deleteReferralUser, getReferralUserList } from '../controllers/referral.controller.js';
import { validateToken } from '../JWT/JWT.js';
import { validateCreateReferral, validateDeleteReferralUser, validateGetReferralUserList } from '../validation/referral.validation.js';

const router = express.Router();

router.post('/create-referral-users', validateCreateReferral, createReferral);
router.route("/referral-users").get(validateToken, validateGetReferralUserList, getReferralUserList);
router.route("/referral-users/:id").delete(validateToken, validateDeleteReferralUser, deleteReferralUser);


export default router;