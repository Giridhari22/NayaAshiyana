const PG = require("../../models/pgDetails")
const mongoose = require("mongoose")
// const path = require("path")
const path = "http://localhost:4500"




exports.CreatePg = async (req, res) => {
  // console.log(req.body);   
  let images = []
  // let images = req.files
  if (req.files) {

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      images.push(`/${file.path}`);
    }
  }
  // if(req.body.owner){
  //   req.body.owner = JSON.parse(req.body.owner);
  // }
  if (req.body.ratings) {
    req.body.ratings = JSON.parse(req.body.ratings);
  }
  if (req.body.area) {
    req.body.area = JSON.parse(req.body.area);
  }
  if (req.body.securityDeposit) {
    req.body.securityDeposit = JSON.parse(req.body.securityDeposit);
  }

  req.body.images = images;
  // const imageUrls = req.file.path

  try {
    const newPg = new PG(req.body);
    const data = await newPg.save()
    res.status(201).json({ success: true, message: 'PG detail created', pg: data });
  } catch (error) {
    res.status(401).json({ message: `catch error =>${error}` })
  }
}


exports.getPg = async (req, res) => {
  const pgId = req.params.pgId;

  try {
    const PgData = await PG.aggregate([
      {
        "$match": { _id: new mongoose.Types.ObjectId(pgId) }
      },
      {
        $lookup: {
          from: 'owners',
          localField: "ownerId",
          foreignField: "_id",
          as: "own"
        }
      },
      {
        $unwind: "$own" //to get single object .. its important
      },
      { // isme logic laga sakte hai aur dekh sakte hai ki kis kis field pe kam karna hai
        $project: {

          name: "$name",
          category: "$category",
          furnished: "$furnished",
          addToFavorites: "$addToFavorites",
          numberOfRooms: "$numberOfRooms",
          Price: "$Price",
          facilities: "$facilities",
          availableRooms: "$availableRooms",
          ownerName: "$own.name",
          ownerEmail: "$own.email",
          ownerPhone: "$own.phone",
          ratings: "$ratings",
          images: "$images",
          description: "$description",
          rules: "$rules",
          nearbyLandmarks: "$nearbyLandmarks",
          area: "$area",
          city: "$city",
          type: "$type",
          parking: "$parking",
          RoomType: "$Private",
          ElectricityCharge: "$ElectricityCharge",
          FoodAvailable: "$FoodAvailable",
          FoodChargesInclude: "$FoodChargesInclude",
          securityDeposit: "$securityDeposit",
          independent: "$independent",
          extraCharges: "$extraCharges",
          numberOfBathrooms: "$numberOfBathrooms",
          numberOfBalconies: "$numberOfBalconies"
        }
      },
    ])

    res.status(201).json({ message: "here is your data", pg: PgData })
    console.log("pgdata", PgData)
  } catch (error) {
    res.status(200).json({ error: ` catch error ${error}` })
  }

}




exports.getAllPg = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 3;
    const skip = (page - 1) * itemsPerPage;

    const pgs = await PG.find()
      .skip(skip)
      .limit(itemsPerPage);

    // console.log("pgs", pgs);
    res.status(200).json({ message: "Here are your pg details", pgs });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching PGs' });
  }
};

exports.getAllPgByCity = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 2;
    const skip = (page - 1) * itemsPerPage;

    const pgs = await PG.find()
      .skip(skip)
      .limit(itemsPerPage);

    console.log("pgs", pgs);
    res.status(200).json({ message: "Here are your pg details", pgs });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching PGs' });
  }
};

exports.getPgByFavourite = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 3;
    const skip = (page - 1) * itemsPerPage;

    const favoritePGs = await PG.find({ addToFavorites: true })
      .skip(skip)
      .limit(itemsPerPage);

    if (favoritePGs.length === 0) {
      return res.status(404).json({ message: 'No favorite PGs found.' });
    }

    return res.status(200).json({ message: "here is your fav pg details", favoritePGs });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.updateFavPg = async (req, res) => {
  const { id } = req.params;

  const pg = await PG.findById(id);

  pg.addToFavorites = !pg.addToFavorites;

  await pg.save();

  res.json({
    success: true,
    message: 'PG favorite updated successfully.',
    pg: pg
  });
}



exports.updatePg = async (req, res) => {
  try {
    const pgId = req.params.id;
    const updatedPGData = req.body; // Updated PG data sent in the request body

    const updatedPG = await PG.findByIdAndUpdate(pgId, updatedPGData, { new: true });

    if (!updatedPG) {
      return res.status(404).json({ message: 'PG not found' });
    }

    res.json(updatedPG);
  } catch (error) {
    res.status(500).json({ error: `Error update pg  catch ${error}` });

  }
}

exports.deletePg = async (req, res) => {
  try {
    const pgId = req.params.id;

    const deletedPG = await PG.findByIdAndRemove(pgId);

    if (!deletedPG) {
      return res.status(404).json({ message: 'PG not found' });
    }

    res.json({ message: 'PG deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


exports.searchPg = async (req, res) => {



  try {
    const city = req.query.city;

    const query = {};

    if (req.body !== null) {
      const {
        area,
        category,
        priceMin,
        priceMax,
        type

      } = req.body;

      if (type) {
        query.type = new RegExp(type, 'i');

      }

      console.log("area", priceMin, priceMax)
      if (area) {
        query['area.name'] = new RegExp(area, "i")
      }
      if (category) {
        query.category = new RegExp(category, "i");
      }

      if (priceMin && priceMax) {
        query.Price = { $gte: priceMin, $lte: priceMax };
      } else if (priceMin) {
        query.Price = { $gte: priceMin };
      } else if (priceMax) {
        query.Price = { $lte: priceMax };
      }
    }

    if (city) {
      query.city = new RegExp(city, "i");
    }

    const results = await PG.find(query);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};