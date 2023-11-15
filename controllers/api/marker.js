const router = require("express").Router()
const Marker = require("../../models/Marker")

router.post("/", async (req, res) => {
  if (!req.session?.user_id) {
    res.status(401).json({ msg: "sign in loser" })
  } else {
    const query = await Marker.create({
      ...req.body,
      user_id: req.session.user_id
    })
    console.log(query)
    res.json({ status: "ok" })
  }
})

module.exports = router;