import SibApiV3Sdk from "sib-api-v3-sdk";

const sendEmail = async (email, subject, message) => {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;

  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  await apiInstance.sendTransacEmail({
    to: [{ email }],
    sender: {
      email: process.env.SENDER_EMAIL,
    },
    subject,
    htmlContent: message,
  });
};

export default sendEmail;