import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.1.0",

    info: {
      title: "My Auth API",
      version: "1.0.0",
      description: "API documentation",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description: "Authentication related APIs",
      },
      {
        name: "Users",
        description: "User related APIs",
      },
      {
        name: "Products",
        description: "Product related APIs",
      },
    ],

    components: {
      schemas: {
        UserCreate: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", format: "email", example: "jane@example.com" },
            password: { type: "string", format: "password", example: "secret123" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "jane@example.com" },
            password: { type: "string", format: "password", example: "secret123" },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            id: { type: "string", example: "clx123abc" },
            name: { type: "string", example: "Jane Doe" },
            email: { type: "string", format: "email", example: "jane@example.com" },
            password: { type: "string", example: "secret123" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            status: { type: "boolean", example: true },
            message: { type: "string", example: "user created successfully" },
            user: { $ref: "#/components/schemas/UserResponse" },
          },
        },
      },
    },
  },

  apis: ["./src/routes/**/*.ts"],
});

export default swaggerSpec;