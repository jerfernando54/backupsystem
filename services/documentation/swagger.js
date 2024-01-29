const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "CRUST BACKUP API",
      version: "0.1.0",
      description: 
        "Welcome to the CRUST BACKUP API documentation. This API empowers users to efficiently manage and execute backup operations, safeguarding critical data and ensuring the integrity of your information. Explore the comprehensive features and functionalities provided by this API to seamlessly create, monitor, and restore backups, enhancing the resilience and reliability of your systems. Dive into the details below to leverage the full potential of the CRUST BACKUP API.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "PYD - Informatica",
        url: "https://pyd.es",
        email: "jraimundo@pyd.es",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options