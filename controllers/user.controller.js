import {User} from '../models/user.model.js';
import Referral from '../models/referral.model.js';
import {createTokens} from '../JWT/JWT.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const saveFormData = asyncHandler(async (req, res) => {
    try {
      const { name, mobile, referralCode, gender, technology, dateOfBirth } = req.body;
      console.log(req.body, req.files);
      const images = req.files;
  
      const user = new User({ name, mobile, gender, technology, dateOfBirth });
      user.images = req.files.map((file) => ({
        fileName: file.originalname,
        fileType: file.mimetype,
        file: `/uploads/${file.filename}`,
      }));
      await user.save();
      if (referralCode) {
        let referral = await Referral.findOne({ code: referralCode });
        if (referral) {
          const referralUserId = referral.userId;
          let existingUser = await User.findById(referralUserId);
          user.points += 10;
          existingUser.points += 20;
          await user.save();
          await existingUser.save();
        }
      }
      const accessToken = createTokens(user);
    res.send({ accessToken });
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: err.message });
    }
  })


export const updateUserProfile  = async(req,res)=>{ 

    try {
        const { name, mobile, gender, technology, dateOfBirth } = req.body;
        const userId = req.user._id;
        const user = await User.findByIdAndUpdate(userId, {
          $set: {
            name,
            mobile,
            gender,
            technology,
            dateOfBirth
          }
        }, { new: true });
    
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }


}

