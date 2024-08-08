// controllers/referralController.js
import {User} from '../models/user.model.js';
import Referral from '../models/referral.model.js';




export const createReferral  = async(req,res)=>{  
  const userData = req.body;
  try {
   
    const user = new User(userData);
    await user.save();

    const referralCode = Math.random().toString(36).substr(2, 6).toUpperCase();

   
    const referral = new Referral({
      code: referralCode,
      userId: user._id,
    });
    await referral.save();

   
    user.referralCode = referralCode;
    await user.save();

    res.send({ user, referralCode });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating user' });
  }

}

export const getReferralUserList = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (page - 1) * limit;

    // Find all referrals and populate the userId field with the corresponding user data
    const referralUsers = await Referral.find()
      .populate('userId') 
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // sort by creation date in descending order

    // Count the total number of referrals for pagination
    const totalReferrals = await Referral.countDocuments();

    // Map the referral users to a list of user objects
    const userList = referralUsers.map((referral) => {
      return {
        _id: referral?.userId?._id,
        mobile: referral?.userId?.mobile,
        referralCode: referral?.code,
      };
    });

    res.json({
      userList,
      totalPages: Math.ceil(totalReferrals / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error?.message });
  }
};


export const deleteReferralUser = async (req,res) => {
  try {
    const id = req.params.id;
    // Find and delete the user document
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Find and delete the corresponding referral document
    const deletedReferral = await Referral.findOneAndDelete({ userId:id });
    if (!deletedReferral) {
      throw new Error(`Referral for user with ID ${id} not found`);
    }

    return { message: `Referral user with ID  deleted successfully` };
  } catch (error) {
    console.log(error)
    res.json({ message: error?.message });
  }
};