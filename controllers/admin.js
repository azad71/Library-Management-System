// importing models
const Book = require('../models/book');
const User = require('../models/user');
const Activity = require('../models/activity');

// GLOBAL_VARIABLES
const PER_PAGE = 10;

exports.getDashboard = async(req, res, next) => {
    var page = req.query.page || 1;
    try{
        const users_count = await User.find().countDocuments();
        const books_count = await Book.find().countDocuments();
        const activity_count = await Activity.find().countDocuments();
        const activities = await Activity
            .find()
            .sort('-createdAt')
            .skip((PER_PAGE * page) - PER_PAGE)
            .limit(PER_PAGE);

        res.render("admin/index", {
            users_count : users_count,
            books_count : books_count,
            activities : activities,
            current : page,
            pages: Math.ceil(activity_count / perPage),
            });   
    } catch(err) {
        console.log(err)
    }
}

// router.get("/admin",middleware.isAdmin,  (req, res) => {
//     var perPage = 10;
//     var page = req.query.page || 1;
//     User.find({}, (err, users) => {
//        if (err) throw new Error("Failed to find users at /admin GET");
       
//        Book.find({}, (err, books) => {
//           if (err) throw new Error("Failed to find books at /admin GET");
          
//           Activity.find()
//           .sort({entryTime : 'desc'})
//           .skip((perPage * page) - perPage)
//           .limit(perPage)
//           .exec((err, activities) => {
//              if (err) throw new Error("Failed to find activities at /admin GET");
             
//              Activity.countDocuments().exec((err, count) => {
//                 if(err) throw new Error("Failed to find activities count at /admin GET");
              
//                  res.render("admin/index", {
//                     users : users,
//                     books : books,
//                     activities : activities,
//                     current : page,
//                     pages: Math.ceil(count / perPage),
//                  });      
//              });
//           });
//        });
//     });
//   });