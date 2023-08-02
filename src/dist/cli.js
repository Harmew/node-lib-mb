#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import chalk from "chalk";
import Validity from "./http-validity.js";
import LinksExtractor from "./index.js";
const args = process.argv;
class Cli {
    static showResult(validity, result, identifier = "") {
        return __awaiter(this, void 0, void 0, function* () {
            if (validity)
                console.log(chalk.yellow("Result with Status:"), chalk.red(identifier), yield Validity.validityLinks(result));
            else
                console.log(chalk.yellow("Result:"), chalk.red(identifier), result);
        });
    }
    static processText(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!args[3])
                    throw LinksExtractor.handleError(new Error(chalk.red("No path provided")));
                const validity = args.includes("--validity");
                if (fs.lstatSync(args[3]).isFile()) {
                    const result = LinksExtractor.getArchives(args[3]);
                    Cli.showResult(validity, yield result, args[3]);
                }
                else if (fs.lstatSync(args[3]).isDirectory()) {
                    const archive = fs.promises.readdir(args[3]);
                    (yield archive).forEach((file) => __awaiter(this, void 0, void 0, function* () {
                        const response = yield LinksExtractor.getArchives(`${args[3]}/${file}`);
                        Cli.showResult(validity, response, `${args[3]}/${file}`);
                    }));
                }
            }
            catch (err) {
                if (err instanceof Error)
                    LinksExtractor.handleError(err);
            }
        });
    }
}
if (args)
    Cli.processText(args);
