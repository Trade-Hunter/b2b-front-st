<template>
  <div class="TVChartContainer bg-gray-200" ref="chartContainer" />
</template>

<script>
import '/public/charting_library/charting_library.js';
import Datafeed from './datafeed.ts';

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export default {
  name: 'TVChartContainer',
  props: {
    symbol: {
      default: 'PETR4',
      type: String,
    },
    interval: {
      default: '1',
      type: String,
    },
    datafeedUrl: {
      default: 'http://localhost:5000',
      type: String,
    },
    libraryPath: {
      default: '/public/charting_library/',
      type: String,
    },
    chartsStorageUrl: {
      default: 'https://saveload.tradingview.com',
      type: String,
    },
    chartsStorageApiVersion: {
      default: '1.1',
      type: String,
    },
    clientId: {
      default: 'tradingview.com',
      type: String,
    },
    userId: {
      default: 'public_user_id',
      type: String,
    },
    fullscreen: {
      default: false,
      type: Boolean,
    },
    autosize: {
      default: true,
      type: Boolean,
    },
    studiesOverrides: {
      type: Object,
    },
  },
  tvWidget: null,
  mounted() {
    const container = this.$refs.chartContainer;
    const widgetOptions = {
      //symbol: this.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      //datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl),
      interval: this.interval,
      container: container,
      //library_path: this.libraryPath,

      locale: 'pt',
      //disabled_features: ['use_localstorage_for_settings'],
      //enabled_features: ['study_templates'],
      //charts_storage_url: this.chartsStorageUrl,
      //charts_storage_api_version: this.chartsStorageApiVersion,
      client_id: this.clientId,
      user_id: this.userId,
      fullscreen: this.fullscreen,
      autosize: this.autosize,
      studies_overrides: this.studiesOverrides,

      symbol: 'PETR4', // default symbol
      interval: this.interval, // default interval
      //fullscreen: true, // displays the chart in the fullscreen mode

      timezone: 'exchange',
      datafeed: Datafeed,
      theme: this.theme == 'dark' ? 'Dark' : 'Light',

      //chartsStorageUrl: "https://saveload.tradingview.com",
      library_path: '/charting_library/',
    };

    const tv = TradingView;

    const tvWidget = new tv.widget(widgetOptions);
    //tvWidget.subscribe('chart_loaded')
    this.tvWidget = tvWidget;
    //tvWidget.
    tvWidget.onChartReady(() => {
      console.log('chart ready');

      //tvWidget.intervalSync(true);
      //tvWidget.crosshairSync(true);
      //tvWidget.timeSync(true);

      // tvWidget.headerReady().then(() => {
      //   const button = tvWidget.createButton();
      //   button.setAttribute('title', 'Click to show a notification popup');
      //   button.classList.add('apply-common-tooltip');
      //   button.addEventListener('click', () =>
      //     tvWidget.showNoticeDialog({
      //       title: 'Notification',
      //       body: 'TradingView Charting Library API works correctly',
      //       callback: () => {
      //         // eslint-disable-next-line no-console
      //         console.log('Noticed!');
      //        tvWidget.changeTheme('Light')
      //       },
      //     }),
      //   );
      //   button.innerHTML = 'Check API';
      // });
    });
  },

  destroyed() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  },
  computed: {
    theme() {
      return this.$store.getters['theme/getTheme'];
    },
  },
  watch: {
    theme(newv, oldv) {
      if (newv == 'dark') this.tvWidget.changeTheme('Dark');
      else this.tvWidget.changeTheme('Light');
    },
  },
};
</script>
