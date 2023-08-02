/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import fs from "fs";
import Link from "./interfaces/link.js";
declare class LinksExtractor {
    constructor();
    static handleError(err: NodeJS.ErrnoException): void;
    private static linksExtractor;
    static getArchives(path: fs.PathLike | string): Promise<Link[] | string | void>;
}
export default LinksExtractor;
