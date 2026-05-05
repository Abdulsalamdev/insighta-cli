
---

#  CLI DOCS

```md
# Insighta CLI

A global command-line tool for querying Insighta Labs API.

---

## Installation

```bash
npm install -g insighta-cli

Core commands
# list
insighta profiles list

# create
insighta profiles create --name "John"

# search (natural language)
insighta profiles search --q "young females in nigeria"

# get single
insighta profiles get 123e4567-uuid

# delete (admin only)
insighta profiles delete 123e4567-uuid

# export
insighta profiles export