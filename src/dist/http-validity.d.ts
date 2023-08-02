import Link from "./interfaces/link.js";
declare class Validity {
    private static extractLinks;
    private static checkStatus;
    private static errorsHandler;
    static validityLinks(arr: Link[] | string | void): Promise<void | {
        status: number | string | undefined;
    }[]>;
}
export default Validity;
