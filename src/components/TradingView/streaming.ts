import { parseFullSymbol } from "./helpers";

//const socket = io("wss://streamer.cryptocompare.com");
const channelToSubscription = new Map();

let auth = JSON.parse((localStorage as any).getItem("auth"));
auth = {
  auth: {
    token:
      "eyJfaWQiOiI2MjY4YzcwZDU0OTAzN2Y2MzIxMTAwN2EiLCJpYXQiOjE2Njk3NTkzMDgwMzh9.eyJhbGciOiJFUzUxMiIsImtpZCI6Ilo3c2M4bXdtUEFISzFhSzN4TGVzbDRlckFiYXVTWG1pLUZhSTM5REVwY0kifQ.ADfhke8XGkC4xbEKBYb5MhN_1xxjy93PkEeoLIUdzjWFZWVypANXWWE9gjU2jMwZKCywhT-4fQq4sbaLwlwy0L-ZAP9Qq33hnenV0aC29-n7b5EAnpj4ip_in_YpnvFZ_pKGLj9yTA7XFyhHQgRgIWly6w1rDGDP-zYSyXawRvCkINb2",
  },
};
var connection = new WebSocket(
  `${import.meta.env.VITE_WSSTREAM_HOST}/?token=${auth?.auth.token}`
);
//var connection = new WebSocket(`${import.meta.env.VITE_WSSTREAM_HOST}/?token=`);
var timeframe = "1";
//console.log(auth?.auth.token);

//console.log(import.meta.env.VITE_WSSTREAM_HOST);

const setupStream = async (cod: string, resolution: string) => {
  timeframe = resolution;
  connection.onopen = (event) => {
    console.log("Successfully connected to the echo websocket server...");
  };
  connection.send(`C=S;I=quote;T=${cod};O=${resolution}`);
  connection.onclose = (event) => {
    if (event.code == 3000) {
      console.log("tem q mandar o mano fazer refresh");
    }
  };
  connection.onerror = (event) => {
    console.log("erro stream rates");
  };
  connection.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type == "E") {
      connection.close();
    } else if (data.type == "M") {
      //console.log('data is', data);

      HandleSubscribeStream(data.data, resolution);
    }
  };
};

// socket.on("connect", () => {
//   console.log("[socket] Connected");
// });

// socket.on("disconnect", (reason) => {
//   console.log("[socket] Disconnected:", reason);
// });

// socket.on("error", (error) => {
//   console.log("[socket] Error:", error);
// });

const SubscribeStream = (data: any) => {
  //console.log('on subscribe stream', data);

  for (var sub of data.subs) {
    console.log("sub eh", sub);
    const [eventTypeStr, exchange, sym, resolution] = sub.split("~");
    //console.log(eventTypeStr, exchange, sym);
    setupStream(sym, resolution);
  }
};

//TODO mock do backend
const HandleSubscribeStream = (data: any, resolution: string) => {
  //console.log('[socket] Message:', data);
  const [
    eventTypeStr,
    exchange,
    sym,
    openStr,
    highStr,
    lowStr,
    tradePriceStr,
    volumeStr,
    tradeTimeStr,
  ] = data.split("~");

  //console.log('au', eventTypeStr, exchange, sym, tradeTimeStr, tradePriceStr);
  if (parseInt(eventTypeStr) !== 0) {
    // skip all non-TRADE events
    return;
  }

  const tradePrice = parseFloat(tradePriceStr);
  const tradeTime = parseInt(tradeTimeStr);
  const channelString = `0~${exchange}~${sym}`;
  const subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem === undefined) {
    return;
  }
  //console.log('resolution eh', timeframe, subscriptionItem.resolution);
  // if (resolution !== timeframe) console.log('ueee', resolution, timeframe);

  //console.log('subscription item', subscriptionItem);
  const lastDailyBar = subscriptionItem.lastDailyBar;
  //console.log('last subs bar', lastDailyBar);
  //console.log('ssadsads', lastDailyBar.time, lastDailyBar.resolution);

  const nextDailyBarTime = getNextDailyBarTime(
    lastDailyBar.time,
    subscriptionItem.resolution
  );
  //console.log('tradetime', tradeTime, 'currt', lastDailyBar.time,  'next',nextDailyBarTime);

  //console.log(tradeTime, lastDailyBar.time, nextDailyBarTime, Number(volumeStr));
  let bar: any;

  if (tradeTime >= nextDailyBarTime) {
    //console.log(data, openStr, highStr, lowStr, tradePrice, volumeStr);
    bar = {
      time: tradeTime,
      open: Number(openStr),
      high: Number(highStr),
      low: Number(lowStr),
      close: tradePrice,
      volume: Number(volumeStr),
    };
    //console.log('[socket] Generate new bar', bar);
  } else {
    //console.log('opa', lastDailyBar.volume, resolution);
    //console.log('nao atualizo', openStr, highStr, lowStr, tradePrice, volumeStr);
    //console.log('laslas', lastDailyBar, lastDailyBar.volume, lastDailyBar.isLastBar);
    bar = {
      ...lastDailyBar,
      high:
        lastDailyBar.volume > Number(volumeStr)
          ? lastDailyBar.high
          : Number(highStr),
      low:
        lastDailyBar.volume > Number(volumeStr)
          ? lastDailyBar.low
          : Number(lowStr),
      close: tradePrice,
      //v2: lastDailyBar.isLastBar ? lastDailyBar.v2 : lastDailyBar.volume,
      volume: Math.max(lastDailyBar.volume, Number(volumeStr)),
    };

    //bar.volume = bar.v2 + Number(volumeStr);

    //console.log('[socket] Update the latest bar by price', tradePrice);
  }
  subscriptionItem.lastDailyBar = bar;

  // send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler: any) => handler.callback(bar));
};

function getNextDailyBarTime(barTime: any, resolution: string) {
  let date = new Date(barTime);

  switch (resolution) {
    case "1": {
      date.setMinutes(date.getMinutes() + 1);
      break;
    }
    case "5": {
      date.setMinutes(date.getMinutes() + 5);
      break;
    }
    case "15": {
      date.setMinutes(date.getMinutes() + 15);
      break;
    }
    case "60": {
      date.setMinutes(date.getMinutes() + 60);
      break;
    }
    case "1D": {
      date.setDate(date.getDate() + 1);
      break;
    }
    default: {
      date.setMinutes(date.getMinutes() + 1);
    }
  }

  return date.getTime();
}

export function subscribeOnStream(
  symbolInfo: any,
  resolution: any,
  onRealtimeCallback: any,
  subscribeUID: any,
  onResetCacheNeededCallback: any,
  lastDailyBar: any
) {
  const parsedSymbol: any = parseFullSymbol(symbolInfo.full_name);
  const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.sym}`;
  const handler = {
    id: subscribeUID,
    callback: onRealtimeCallback,
  };

  let subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem) {
    subscriptionItem.resolution = resolution;
    lastDailyBar.v2 = lastDailyBar.volume;
    subscriptionItem.lastDailyBar = lastDailyBar;

    //subscriptionItem.lastDailyBar = { ...lastDailyBar, time: new Date().getTime() };
    // already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler);
    return;
  }
  subscriptionItem = {
    subscribeUID,
    resolution,
    lastDailyBar,
    handlers: [handler],
  };
  channelToSubscription.set(channelString, subscriptionItem);
  //console.log('[subscribeBars]: Subscribe to streaming. Channel:', channelString);

  //TODO: subscribe no streaming hunter

  SubscribeStream({ subs: [channelString] });
  //socket.emit("SubAdd", { subs: [channelString] });

  //onResetCacheNeededCallback('sdosdos');
}

export function unsubscribeFromStream(subscriberUID: any) {
  console.log("unsubscribe from stream fé");
  // find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex(
      (handler: any) => handler.id === subscriberUID
    );
    // console.log('handler index is', channelString, handlerIndex, subscriptionItem);
    if (handlerIndex !== -1) {
      // remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        // unsubscribe from the channel, if it was the last handler
        //console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
        //socket.emit('SubRemove', { subs: [channelString] });

        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
