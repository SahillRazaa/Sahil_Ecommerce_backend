const router = require("express").Router();

const stripe = require("stripe")("sk_test_51NuTGVSJOmprMEIttZtlHb4c4HuqmkdK5aq9lF1th4JKhWQ43IsaqNI0jtQzSxtE82n6ad0iKXtt4V4OIeD7HpXC00ovFbTCj6");

router.post("/checkout", async (req, res) => {
  try {
    const amountInCents = parseInt(req.body.amount);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
