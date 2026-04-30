#!/usr/bin/env node

const { Command } = require("commander");
const { login } = require("./command/login");
const { getProfiles } = require("./command/profiles");

const program = new Command();

program
  .command("login")
  .description("Login via GitHub")
  .action(login);

program
  .command("profiles")
  .description("Fetch profiles")
  .action(getProfiles);

program.parse(process.argv);