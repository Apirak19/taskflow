import express from "express";
import crypto from "crypto";

const router = express.Router();

const SECRET = "mySecretKey";

router.post("/slack", express.json(), (req, res) => {
  const signature = req.headers["x-webhook-signature"];
  const computedSig = crypto
    .createHmac("sha256", SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  //   if (signature != computedSig) {
  //     return res.status(403).json({
  //       message: "invalid signature",
  //     });
  //   }

  console.log("webhook recieved: ", req.body);

  res.json({
    message: "webhook recieved",
  });
});

export default router;
