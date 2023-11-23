const router = require("express").Router();
const Pg = require("../controllers/Pg/pgController");
const authMiddle  = require("../middlewares/authMiddle")
const multer  = require('multer');
// const { validate } = require("../validation/validateModel");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); 
    },
  });
                 
  const upload = multer({ storage });

router.post("/CreatePg",upload.array('images', 5),Pg.CreatePg )
router.get("/getAllPg",Pg.getAllPg )
router.get("/getAllPgByCity",Pg.getAllPgByCity )
router.get("/getPgByFavourite",Pg.getPgByFavourite )
router.post("/updateFavPg/:id", Pg.updateFavPg)


router.get("/getPg/:pgId",authMiddle,Pg.getPg )

// router.post("/loginUser",user.Login)
router.post("/searchPg", Pg.searchPg)
router.put("/updatePg/:id",Pg.updatePg)
router.delete("/deletePg/:id",Pg.deletePg)

module.exports = router