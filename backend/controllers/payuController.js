import crypto from "crypto";
import Order from "../models/Order.js";

// POST /api/payments/payu/init
// Body: { orderId }
export const initPayUPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "orderId is required" });
    }

    const order = await Order.findById(orderId).populate(
      "user",
      "name email phone"
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const key = (process.env.PAYU_KEY || "").trim();
    const salt = (process.env.PAYU_SALT || "").trim();

    const txnid = `txn_${orderId}_${Date.now()}`;
    const amountStr = Number(order.totalAmount).toFixed(2);

    const firstname =
      (order.address?.name || order.user?.name || "Customer").trim();
    const email = (order.user?.email || "test@example.com").trim();
    const phone = (order.address?.phone || "9999999999").trim();

    // SPACE nahi, hyphen
    const productInfo = `Order-${orderId}`.trim();

    const udf1 = orderId.toString(); // orderId pass kar rahe hai

    // EXACT PayU format:
    // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
    const hashString =
      [
        key,
        txnid,
        amountStr,
        productInfo,
        firstname,
        email,
        udf1,
        "", // udf2
        "", // udf3
        "", // udf4
        "", // udf5
        "", // udf6
        "", // udf7
        "", // udf8
        "", // udf9
        ""  // udf10
      ].join("|") + "|" + salt;

    console.log("PayU hashString =>", hashString);

    const hash = crypto
      .createHash("sha512")
      .update(hashString)
      .digest("hex");

    console.log("PayU hash =>", hash);

    const actionUrl =
      process.env.PAYU_ENV === "prod"
        ? "https://secure.payu.in/_payment"
        : "https://test.payu.in/_payment";

    const payuParams = {
      key,
      txnid,
      amount: amountStr,
      productinfo: productInfo,
      firstname,
      email,
      phone,
      surl: process.env.PAYU_SUCCESS_URL,
      furl: process.env.PAYU_FAILURE_URL,
      hash,
      udf1,
    };

    return res.json({
      success: true,
      action: actionUrl,
      params: payuParams,
    });
  } catch (err) {
    console.error("PayU init error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while initiating PayU payment",
    });
  }
};

// PayU success/failure callback
// URL: POST /api/payments/payu/response
export const handlePayUResponse = async (req, res) => {
  try {
    const {
      status,
      txnid,
      mihpayid,
      hash,
      key,
      amount,
      productinfo,
      firstname,
      email,
      udf1, // isme humne orderId bheja tha
    } = req.body;

    console.log("PayU Response:", req.body);

    // Basic validation
    if (!txnid || !key || !hash) {
      return res.status(400).send("Invalid PayU response");
    }

    if (udf1) {
      const orderId = udf1;

      const newStatus =
        status === "success"
          ? "PAID"
          : status === "failure"
          ? "FAILED"
          : "PENDING";

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: newStatus,
        paymentMethod: "ONLINE_TEST", // ya 'PAYU' karna ho to model enum update kar dena
      });
    }

    return res.send(`
      <html>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
          <h2>Payment ${status}</h2>
          <p>Transaction ID: ${txnid}</p>
          <p>MihPay ID: ${mihpayid || ""}</p>
          <p>You can now close this tab and return to the app.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("PayU response error:", err);
    return res
      .status(500)
      .send("Something went wrong processing payment response.");
  }
};
