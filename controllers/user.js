// importing models
const User = require("../models/user"),
      Activity = require("../models/activity"),
      Book = require("../models/book"),
      Issue = require("../models/issue"),
      Comment = require("../models/comment");

// GLOBAL_VARIABLES
const PER_PAGE = 5;

//user -> dashboard
exports.getUserDashboard = async(req, res, next) => {
    var page = req.params.page || 1;
    const user_id = req. user._id;

    try {
        // fetch user info from db and populate it with related book issue
        const user = await User.findById(user_id);

        if(user.bookIssueInfo.length > 0) {
            const issues = await Issue.find({"user_id.id" : user._id});

            for(let issue of issues) {
                if(issue.book_info.returnDate < Date.now()) {
                    user.violatonFlag = true;
                    user.save();
                    req.flash("warning", "You are flagged for not returning " + issue.book_info.title + " in time");
                    break;
                }
            }
        }
        const activities = await Activity
            .find({"user_id.id": req.user._id})
            .sort({entryTime: 'desc'})
            .skip((PER_PAGE * page) - PER_PAGE)
            .limit(PER_PAGE);

        const activity_count = await Activity
        .find({"user_id.id": req.user._id})
        .countDocuments();

        res.render("user/index", {
            user : user,
            current : page,
            pages: Math.ceil(activity_count / PER_PAGE),
            activities : activities,
        });
    } catch(err) {
        console.log(err);
        return res.redirect('back');
    }
}

// user -> profile
exports.getUserProfile = (req, res, next) => {
    res.render("user/profile");
}

// user -> update/change password
exports.putUpdatePassword = async(req, res, next) => {
    const username = req.user.username;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.password;

    try {
        const user = await User.findByUsername(username);
        await user.changePassword(oldPassword, newPassword);
        await user.save();

        // logging activity
        const activity = new Activity({
            category: "Update Password",
            user_id : {
                id : req.user._id,
                username : req.user.username,
            },
        });
        await activity.save();

        req.flash("success", "Your password is recently updated. Please log in again to confirm");
        res.redirect("/auth/user-login");
    } catch(err) {
        console.log(err);
        return res.redirect('back');
    }
}

// user -> update profile
exports.putUpdateUserProfile = async(req, res, next) => {
    try{
        const userUpdateInfo = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "gender": req.body.gender,
            "address": req.body.address,
        }
        await User.findByIdAndUpdate(req.user._id, userUpdateInfo);

        // logging activity
        const activity = new Activity({
            category: "Update Profile",
            user_id: {
                id: req.user._id,
                username: req.user.username,
            }
        });
        await activity.save();

        res.redirect('back');
    } catch(err) {
        console.log(err);
        return res.redirect('back');
    }
}