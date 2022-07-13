const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

//Creating User and if User is already available which is checked
//by contact number then updating that user name as per new name 
//based on the current requirement

exports.createUser = catchAsync(async (req, res, next) => {

    const { name, contactNumber } = req.body;

    const availItem = await User.find({contactNumber});

    let newUser = [];
    if(availItem.length){
        newUser = await User.findByIdAndUpdate(availItem[0].id, req.body, {
            new: true,
        });
    }
    else{
        newUser = await User.create(req.body);
    }

    
    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});