import { makeApiRequest, generateSymbol, parseFullSymbol } from "./helpers";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";

const lastBarsCache = new Map();

let symbolsCache: any = [];

const configurationData = {
  exchanges: [
    {
      value: "BMFBOVESPA" /* `exchange` argument for the `searchSymbols` method, if a user selects this exchange */,
      name: "B3" /* filter name */,
      desc: "BOVESPA INDEX" /* full exchange name displayed in the filter popup */,
    },
  ],
  symbols_types: [
    {
      name: "Ações",
      value: "stock" /* `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type */,
    },
  ],
  supported_resolutions: ["1", "5", "15", "60", "1D", "1W"],
  currency_codes: ["BRL"],
  supports_time: true,
};

async function getAllSymbols() {
  const data = await makeApiRequest("data/exchanges");
  let allSymbols: any = [];

  for (const exchange of configurationData.exchanges) {
    const symbols = data.Data[exchange.value].symbols;

    allSymbols = [...allSymbols, ...symbols];
  }
  symbolsCache = allSymbols;
  return allSymbols;
}

export default {
  onReady: async (callback: any) => {
    if (symbolsCache.length == 0) await getAllSymbols();
    setTimeout(() => callback(configurationData));
  },

  searchSymbols: async (userInput: any, exchange: any, symbolType: any, onResultReadyCallback: any) => {
    //console.log('[searchSymbols]: Method call');
    const newSymbols = symbolsCache.filter((symbol: any) => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput = symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  },

  resolveSymbol: async (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    var smb = symbolName.includes("BMFBOVESPA:") ? symbolName : "BMFBOVESPA:" + symbolName;
    const symbolItem = symbolsCache.find(({ full_name }: any) => full_name === smb);

    if (!symbolItem) {
      //console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }

    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "1000-1800",
      timezone: "America/Sao_Paulo",
      exchange: symbolItem.exchange,
      //sector: 'PETROLEO',
      //industry: "sadsds",

      minmov: 1,
      pricescale: 100,
      minmove2: 0,
      has_intraday: true,
      has_no_volume: false,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: "streaming", //streaming, endofday, pulsed, delayed_streaming,
      sector: "Setor",
      industry: "Indústria",
    };

    //console.log('[resolveSymbol]: Symbol resolved', symbolName);
    onSymbolResolvedCallback(symbolInfo);
  },

  getBars: async (
    symbolInfo: any,
    resolution: any,
    periodParams: any,
    onHistoryCallback: any,
    onErrorCallback: any
  ) => {
    console.log("osidsidsidisdisdi");
    const { from, countBack, to, firstDataRequest } = periodParams;

    //console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
    const parsedSymbol: any = parseFullSymbol(symbolInfo.full_name);

    const urlParameters: any = {
      e: parsedSymbol.exchange,
      sym: parsedSymbol.sym,
      fromTs: from,
      countBack,
      toTs: to,
      firstDataRequest,
      limit: 2000,
      resolution,
    };
    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join("&");
    try {
      const data = await makeApiRequest(`data/bars?${query}`);
      if ((data.Response && data.Response === "Error") || data.Data.length === 0) {
        // "noData" should be set if there is no data in the requested period.
        onHistoryCallback([], {
          noData: true,
        });
        return;
      }
      let bars: any = [];

      data.Data.forEach((bar: any) => {
        //console.log(bar[0]);
        if (data.FirstValueInArray) {
          bars = [
            ...bars,
            {
              time: bar[0] * 1000,
              open: bar[1],
              high: bar[2],
              low: bar[3],
              close: bar[4],
              volume: bar[5],
            },
          ];
        } else if (bar[0] >= from && bar[0] < to) {
          bars = [
            ...bars,
            {
              time: bar[0] * 1000,
              open: bar[1],
              high: bar[2],
              low: bar[3],
              close: bar[4],
              volume: bar[5],
            },
          ];
        } else if (bar[0] <= from) {
          //bars.pop();
          //bars.unshift({ time: bar[0] * 1000, low: bar[3], high: bar[2], open: bar[1], close: bar[4], volume: bar[5] });
        }
      });

      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, {
          ...bars[bars.length - 1],
        });
      }
      //console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, {
        noData: false,
      });
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  },

  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscribeUID: any,
    onResetCacheNeededCallback: any
  ) => {
    console.log("called subscribe");
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback,
      lastBarsCache.get(symbolInfo.full_name)
    );
  },

  unsubscribeBars: (subscriberUID: any) => {
    //console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    unsubscribeFromStream(subscriberUID);
  },
};
