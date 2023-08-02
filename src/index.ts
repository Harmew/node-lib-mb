import fs from "fs";
import chalk from "chalk";
import Link from "./interfaces/link.js";

class LinksExtractor {
  constructor() {
    LinksExtractor.handleError(new Error("This class can't be instantiated"));
  }

  public static handleError(err: NodeJS.ErrnoException): void {
    if (err.code === "ENOENT") return console.log(chalk.red("No such file or directory"));
    if (err.code === "EISDIR") return console.log(chalk.red("Is a directory"));
    if (err.code === "EACCES") return console.log(chalk.red("Permission denied"));
    if (err.code === undefined) return console.log(chalk.red(err.message));
    return console.log(chalk.red("Something went wrong"));
  }

  private static linksExtractor(text: string): Link[] | string {
    const regex: RegExp = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const catchLinks: RegExpMatchArray[] = [...text.matchAll(regex)];
    const results = catchLinks.map((link) => ({ [String(link[1])]: link[2] }));
    return results.length > 0 ? results : "No links found";
  }

  public static async getArchives(path: fs.PathLike | string): Promise<Link[] | string | void> {
    const encoding: BufferEncoding = "utf-8";
    try {
      const text: string = await fs.promises.readFile(path, { encoding });
      return LinksExtractor.linksExtractor(text);
    } catch (err) {
      if (err instanceof Error) LinksExtractor.handleError(err);
    }
  }
}

export default LinksExtractor;
