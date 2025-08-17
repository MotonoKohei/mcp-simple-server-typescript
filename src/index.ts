#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { randomBytes } from "crypto";

const server = new Server(
  {
    name: "simple-tools-ts",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "echo",
        description: "Echo the input message",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Message to echo",
            },
          },
          required: ["message"],
        },
      },
      {
        name: "concat-abc",
        description: "Concatenate 'abc' to the input",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Text to concatenate with 'abc'",
            },
          },
          required: ["text"],
        },
      },
      {
        name: "now",
        description: "Get current timestamp",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "nonce",
        description: "Generate a random nonce",
        inputSchema: {
          type: "object",
          properties: {
            length: {
              type: "number",
              description: "Length of the nonce (default: 16)",
              default: 16,
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "echo": {
        const message = args?.message || "";
        return {
          content: [
            {
              type: "text",
              text: message,
            },
          ],
        };
      }

      case "concat-abc": {
        const text = args?.text || "";
        const result = text + "abc";
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      }

      case "now": {
        const timestamp = new Date().toISOString();
        return {
          content: [
            {
              type: "text",
              text: timestamp,
            },
          ],
        };
      }

      case "nonce": {
        const length = args?.length || 16;
        const nonce = randomBytes(length).toString("hex");
        return {
          content: [
            {
              type: "text",
              text: nonce,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Simple MCP Server (TypeScript) running on stdio");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
}