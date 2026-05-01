
---

#  CLI DOCS

```md
# Insighta CLI

A global command-line tool for querying Insighta Labs API.

---

## Installation

```bash
npm install -g insighta-cli

cli/
 ├── index.js        # entry point
 ├── api.js          # axios setup
 ├── commands/
 │    ├── auth.js
 │    └── profiles.js
 └── utils/
      └── spinner.js

Core commands
insighta login
insighta profiles list
insighta profiles create --name "John"
insighta profiles export
insighta logout