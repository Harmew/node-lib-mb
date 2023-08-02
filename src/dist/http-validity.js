var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Validity {
    static extractLinks(arr) {
        return arr.map((link) => Object.values(link).join());
    }
    static checkStatus(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrStatus = yield Promise.all(arr.map((link) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield fetch(link);
                    return `${response.status} - ${response.statusText}`;
                }
                catch (err) {
                    return this.errorsHandler(err);
                }
            })));
            return arrStatus;
        });
    }
    static errorsHandler(err) {
        if (err.cause.code === "ENETUNREACH")
            return "No found";
        else
            return "Something went wrong";
    }
    static validityLinks(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof arr === "string")
                return console.log(arr);
            if (arr instanceof Array) {
                const links = this.extractLinks(arr);
                const status = yield this.checkStatus(links);
                return arr.map((link, index) => {
                    return Object.assign(Object.assign({}, link), { status: status[index] });
                });
            }
        });
    }
}
export default Validity;
