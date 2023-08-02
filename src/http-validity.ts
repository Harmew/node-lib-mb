import Link from "./interfaces/link.js";
import CustomError from "./interfaces/customError.js";

class Validity {
  private static extractLinks(arr: Link[]): string[] {
    return arr.map((link: Link) => Object.values(link).join());
  }

  private static async checkStatus(arr: string[]): Promise<(string | number)[]> {
    const arrStatus: (string | number)[] = await Promise.all(
      arr.map(async (link: string) => {
        try {
          const response = await fetch(link);
          return `${response.status} - ${response.statusText}`;
        } catch (err) {
          return this.errorsHandler(err as CustomError);
        }
      })
    );
    return arrStatus;
  }

  private static errorsHandler(err: CustomError): string {
    if (err.cause.code === "ENETUNREACH") return "No found";
    else return "Something went wrong";
  }

  public static async validityLinks(
    arr: Link[] | string | void
  ): Promise<void | { status: number | string | undefined }[]> {
    if (typeof arr === "string") return console.log(arr);
    if (arr instanceof Array) {
      const links = this.extractLinks(arr);
      const status = await this.checkStatus(links);

      return arr.map((link: Link, index: number) => {
        return {
          ...link,
          status: status[index],
        };
      });
    }
  }
}

export default Validity;
