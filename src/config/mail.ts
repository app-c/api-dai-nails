interface IMailConfig {
   driver: "ethereal" | "ses";

   defaults: {
      from: {
         email: string;
         name: string;
      };
   };
}

export default {
   driver: process.env.MAIL_DRIVER || "ses",

   defaults: {
      from: {
         email: "williamxinei@gmail.com",
         name: "william",
      },
   },
} as IMailConfig;
