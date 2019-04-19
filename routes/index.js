const express = require("express"),
      router = express.Router();

//landing page
router.get('/', (req, res) => {
   res.render("landing"); 
});



module.exports = router;