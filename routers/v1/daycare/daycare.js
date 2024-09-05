const express = require('express');
const { resCode, resJSON } = require('../../../functions/response');
const router = express.Router();
const uuid = require("uuid");

router.post("/", async (req, res) => {
    try {
       resJSON(res, "success", 200, "Send successfully")
   } catch (e) {
       console.error(e);
       resCode(res, 500);
   }
});

module.exports = router;