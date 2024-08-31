const express = require("express");
const router = express.Router();

router.get("/get", (req, res) => {
    try {
        res.status(200).send("hi from router");
     } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
     }
})

router.post("/post", (req, res) => {
    try {
        res.status(200).send(req.headers);
     } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
     }
});

router.put("/put", (req, res) => {
    try {
        res.status(200).send("hi from router");
     } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
     }
});

router.delete("/delete", (req, res) => {
    try {
        res.status(204).send("Deleted");
     } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
     }
});

module.exports = router;