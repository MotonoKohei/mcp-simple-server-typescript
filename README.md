# Simple MCP Server (TypeScript)

A simple Model Context Protocol (MCP) server implemented in TypeScript with basic tools.

## Features

- **echo**: Echo the input message
- **concat-abc**: Concatenate 'abc' to the input text
- **now**: Get current timestamp
- **nonce**: Generate a random nonce

## Installation

Install using npm:

```bash
npm install -g mcp-simple-server-ts
```

Or use with npx:

```bash
npx mcp-simple-server-ts
```

## Usage

The server can be used with Claude Desktop or any MCP-compatible client by adding the following to your configuration:

```json
{
  "mcpServers": {
    "simple-tools-ts": {
      "command": "mcp-simple-server-ts"
    }
  }
}
```

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run the server: `npm start`

For development with hot reload:
```bash
npm run dev
```

## Tools

### echo
Echoes the provided message.

**Parameters:**
- `message` (string): Message to echo

### concat-abc
Concatenates 'abc' to the provided text.

**Parameters:**
- `text` (string): Text to concatenate with 'abc'

### now
Returns the current timestamp.

**Parameters:** None

### nonce
Generates a random nonce.

**Parameters:**
- `length` (number, optional): Length of the nonce (default: 16)