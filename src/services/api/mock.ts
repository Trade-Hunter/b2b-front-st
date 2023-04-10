import { tableIndex } from "../../components/OI/Equities/api-index";
interface ApiData {
  "open-interest/options": any;
}
function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function getRandomFloat(min: number, max: number, decimals: number) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}
function paramsToObject(entries: any) {
  const result: any = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}
function genSamples(template: any, size: number) {
  var results = [];
  for (var i = 0; i < size; i++) {
    results.push({ ...template, symbol: template.symbol + i });
  }
  return results;
}

class Api {
  data: ApiData;
  constructor() {
    this.data = {
      "open-interest/options": tableIndex,
    };
  }

  get(path: string) {
    const start = path.indexOf("?");
    var indexOfParams = path.substring(start);
    const urlParams = new URLSearchParams(indexOfParams);

    console.log(paramsToObject(urlParams.entries()));
    const { page, size } = paramsToObject(urlParams.entries());

    const _page = Math.max(Number(page), 1);
    const page_size = Math.max(Number(size), 25);
    console.log("pg size", size, Number(size), page_size);

    switch (path.substring(0, start)) {
      case "open-interest/options": {
        const data = this.data["open-interest/options"];
        const total = data.length;
        const pages = Math.ceil(total / page_size);
        const skip = (_page - 1) * page_size;

        return {
          data: data.slice(skip, skip + page_size),
          paging: {
            pages,
            total,
            page: _page,
            page_size,
            hasNext: page !== pages,
          },
        };
        break;
      }
      default:
        console.log("path desconhecido");
    }
  }
}

export default new Api();
