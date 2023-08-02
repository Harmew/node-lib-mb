#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";

import Validity from "./http-validity.js";
import LinksExtractor from "./index.js";

import Link from "./interfaces/link.js";

const args: string[] = process.argv;

class Cli {
  static async showResult(validity: boolean, result: Link[] | string | void, identifier: string = ""): Promise<void> {
    if (validity)
      console.log(chalk.yellow("Result with Status:"), chalk.red(identifier), await Validity.validityLinks(result));
    else console.log(chalk.yellow("Result:"), chalk.red(identifier), result);
  }

  static async processText(args: string[]): Promise<void> {
    try {
      if (!args[3]) throw LinksExtractor.handleError(new Error(chalk.red("No path provided")));
      const validity: boolean = args.includes("--validity");

      if (fs.lstatSync(args[3]).isFile()) {
        const result: Promise<Link[] | string | void> = LinksExtractor.getArchives(args[3]);
        Cli.showResult(validity, await result, args[3]);
      } else if (fs.lstatSync(args[3]).isDirectory()) {
        const archive: Promise<string[]> = fs.promises.readdir(args[3]);
        (await archive).forEach(async (file: string) => {
          const response = await LinksExtractor.getArchives(`${args[3]}/${file}`);
          Cli.showResult(validity, response, `${args[3]}/${file}`);
        });
      }
    } catch (err) {
      if (err instanceof Error) LinksExtractor.handleError(err);
    }
  }
}

if (args) Cli.processText(args);
