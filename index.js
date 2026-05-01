#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const figlet = require("figlet");
const chalk = require("chalk");

const auth = require("./command/auth");
const profiles = require("./command/profiles");


program
  .name("insighta")
  .description("Insighta CLI")
  .version("1.0.0");

// Auth
program.command("login").action(auth.login);
program.command("logout").action(auth.logout);

// Profiles
program.command("profiles:list").action(profiles.list);
program
  .command("profiles:create")
  .option("--name <name>")
  .action(profiles.create);

program.command("profiles:export").action(profiles.exportCSV);

program.parse();