const express = require("express");
const router = express.Router();

const getRecommendations = require("../ai/recommendation");

router.get("/:restaurantId", async (req,res)=>{

  try{

    const data = await getRecommendations(req.params.restaurantId);

    res.json(data);

  }catch(err){

    res.status(500).json(err);

  }

});

module.exports = router;
