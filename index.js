#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const figlet = require("figlet");
const chalk = require("chalk");

const { logout } = require("./command/logout");
const { login } = require("./command/login");
const profiles = require("./command/profiles");

program.name("insighta").description("Insighta CLI").version("1.0.0");

// Auth
program.command("login").action(login);
program.command("logout").action(logout);

// Profiles
const profilesCmd = program.command("profiles").description("Manage profiles");

profilesCmd.action(() => {
  profilesCmd.help();
});

profilesCmd
  .command("list")
  .description("List all profiles")
  .action(profiles.list);

profilesCmd
  .command("create")
  .description("Create a profile")
  .option("--name <name>")
  .action(profiles.create);

profilesCmd
  .command("export")
  .description("Export profiles to CSV")
  .action(profiles.exportCSV);

profilesCmd
  .command("search")
  .description("Search profiles")
  .option("--q <query>", "Search query")
  .action(profiles.search);

profilesCmd
  .command("get <id>")
  .description("Get a single profile")
  .action(profiles.getOne);

profilesCmd
  .command("delete <id>")
  .description("Delete a profile (admin only)")
  .action(profiles.delete);

program.parse();

