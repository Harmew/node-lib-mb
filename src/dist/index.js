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
class LinksExtractor {
    constructor() {
        LinksExtractor.handleError(new Error("This class can't be instantiated"));
    }
    static handleError(err) {
        if (err.code === "ENOENT")
            return console.log(chalk.red("No such file or directory"));
        if (err.code === "EISDIR")
            return console.log(chalk.red("Is a directory"));
        if (err.code === "EACCES")
            return console.log(chalk.red("Permission denied"));
        if (err.code === undefined)
            return console.log(chalk.red(err.message));
        return console.log(chalk.red("Something went wrong"));
    }
    static linksExtractor(text) {
        const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
        const catchLinks = [...text.matchAll(regex)];
        const results = catchLinks.map((link) => ({ [String(link[1])]: link[2] }));
        return results.length > 0 ? results : "No links found";
    }
    static getArchives(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const encoding = "utf-8";
            try {
                const text = yield fs.promises.readFile(path, { encoding });
                return LinksExtractor.linksExtractor(text);
            }
            catch (err) {
                if (err instanceof Error)
                    LinksExtractor.handleError(err);
            }
        });
    }
}
export default LinksExtractor;
