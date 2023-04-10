import { createChart } from "lightweight-charts";

import { defineComponent, toRef, ref, computed, watchEffect, h, onMounted, onUnmounted, watch, toRefs } from "vue";
import { useStore } from "vuex";
var themeOptions: any = {
  dark: {
    chart: {
      borderWidth: 0,
      plotBackgroundColor: null,
      plotShadow: false,
      animation: true,
      spacingTop: 0,
      spacingRight: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      plotBorderWidth: 0,
      backgroundColor: "transparent",
    },
    legend: {
      color: "#000",
      itemStyle: { color: "#e6f1ff", fontFamily: "system-ui" },
    },
    title: {
      style: { fontWeight: "500", color: "#e6f1ff", fontSize: "18px", fontFamily: "system-ui" },
    },
    subtitle: { style: { color: "#cedced", fontFamily: "system-ui" } },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: "#dfe5f07d",
      title: { style: { color: "#e6f1ff", fontFamily: "system-ui" } },
      labels: { style: { color: "#e6f1ff", fontFamily: "system-ui" } },
    },
    xAxis: {
      crosshair: true,
      tickLength: 0,
      gridLineWidth: 0,
      title: { style: { color: "#e6f1ff", fontFamily: "system-ui" } },
      labels: { style: { color: "#e6f1ff", fontFamily: "system-ui" } },
    },
    plotOptions: {
      spline: {
        color: "#E6F1FF",
        dataLabels: {
          color: "#e6f1ff",
        },
      },
    },
    series: {
      lineColor: "#14db64",
      color: "#14db64",
    },
  },
  light: {
    chart: {
      backgroundColor: "transparent",
    },
    legend: {
      itemStyle: { color: "#333333", fontFamily: "system-ui" },
    },
    title: {
      style: { fontWeight: "500", color: "#333333", fill: "#333333", fontSize: "18px", fontFamily: "system-ui" },
    },
    subtitle: { style: { color: "#666666", fontFamily: "system-ui" } },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: "#E6E6E6",
      title: { style: { color: "#666666", fontFamily: "system-ui" } },
      labels: { style: { color: "#666666", fontFamily: "system-ui" } },
    },
    xAxis: {
      gridLineWidth: 0,
      title: { style: { color: "#666666", fontFamily: "system-ui" } },
      labels: { style: { color: "#666666", fontFamily: "system-ui" } },
    },
    plotOptions: {
      spline: {
        color: "#fff",
        dataLabels: {
          color: "#333333",
        },
      },
    },
    series: {
      lineColor: "#68a3ed",
      color: "#68a3ed",
    },
  },
};

export default defineComponent({
  name: "chart",
  props: {
    type: {
      type: String,
      default: "chart",
    },

    options: {
      type: Object,
      required: true,
    },
    seriesOptions: {
      type: Object,
      required: true,
    },
    seriesData: {
      type: Object,
      required: true,
    },

    redrawOnUpdate: {
      type: Boolean,
      default: true,
    },

    oneToOneUpdate: {
      type: Boolean,
      default: false,
    },

    animateOnUpdate: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    const chartRef = ref(null);
    const chart: any = ref(null);
    const series: any = ref(null);
    const store = useStore();

    const ca = computed(() => store.state.theme.theme);

    //const windowSize = computed(() => store.state.theme.collapsed);
    const { options } = toRefs(props);
    const { seriesOptions } = toRefs(props);
    const { seriesData } = toRefs(props);
    console.log("props type", props.type);

    if (options.value && "asdasd" !== props.type) {
      watch(
        seriesData,
        (newValue) => {
          if (chart.value) {
            (series.value as any).setData(newValue);
            chart.value.timeScale().fitContent();
            emit("updated");
          }
        },
        { deep: true }
      );

      // watch(
      //   ca,
      //   (newValue) => {
      //     console.log("triggered theme change highcharts component", newValue);
      //     console.log("chart is", chart.value);
      //     if (chart.value) {
      //       console.log("new value is", newValue);
      //       console.log("options value is", options.value);

      //       (chart.value as any).update(
      //         {
      //           ...(options.value as any),
      //           ...themeOptions[newValue],
      //         },
      //         true,
      //         (props as any).oneToOneOnUpdate,
      //         props.animateOnUpdate
      //       );
      //       emit("updated");
      //     }
      //   },
      //   { deep: true }
      // );

      // watch(
      //   windowSize,
      //   (newValue) => {
      //     console.log("triggered size change highcharts component", newValue);
      //     console.log("chart is", chart.value);
      //     if (chart.value) {
      //       console.log("caraioooo");
      //       setTimeout(() => {
      //         (chart.value as any).reflow(true);
      //         (chart.value as any).redraw(true);
      //       }, 500);
      //       emit("updated");
      //     }
      //   },
      //   { deep: true }
      // );

      console.log("ca eh", ca.value);
      onMounted(() => {
        // themeOptions[ca.value].yAxis.title.text = options.value["yAxis"]?.title?.text;
        // for (var key of Object.keys(themeOptions[ca.value])) {
        //   //console.log(key, Array.isArray(options.value[key]));
        //   options.value[key] = Array.isArray(options.value[key])
        //     ? options.value[key].map((item: any) => {
        //         return { ...item, ...themeOptions[ca.value][key] };
        //       })
        //     : { ...options.value[key], ...themeOptions[ca.value][key] };
        // }

        (chart.value as any) = createChart(chartRef.value as any, options.value);

        series.value = chart.value.addAreaSeries({
          topColor: "rgba(19, 68, 193, 0.4)",
          bottomColor: "rgba(0, 120, 255, 0.0)",
          lineColor: "rgba(19, 40, 153, 1.0)",
          lineWidth: 3,
          ...seriesOptions.value,
        });
        console.log("aaaaa", seriesData.value);
        series.value.setData(seriesData.value);
        queueMicrotask(() => {
          chart.value.timeScale().fitContent();
          emit("rendered");

          // var toolTip: any = document.createElement("div");
          // toolTip.className = "three-line-legend";

          // toolTip.style.position = "absolute";
          // toolTip.style.display = "block";
          // toolTip.style["padding-left"] = "3" + "px";
          // toolTip.style.top = 3 + "px";

          // toolTip.style["width"] = "100%";
          // toolTip.style["text-align"] = "center";
          // //z-index: 1000;

          // function setLastBarText() {
          //   toolTip.innerHTML = '<div style="font-size: 24px; margin: 4px 0px; color: #20262E"> AEROSPACE</div>';
          // }

          // setLastBarText();

          // (chartRef.value as any).appendChild(toolTip);
        });
      });

      onUnmounted(() => {
        //if (chart.value) (chart.value as any).destroy();
        emit("destroyed");
      });
    } else if (!props.options) {
      console.warn('The "options" parameter is required.');
    } else {
      console.warn(`${props.type} is not a valid highcharts type or has not been imported`);
    }

    // Rather than returning a render function here. We'll return the chart ref and highcharts
    // instance so there exposed.
    return {
      chartRef,
      chart,
    };
  },

  render() {
    return h("div", {
      class: "vue-highcharts",
      ref: "chartRef",
    });
  },
});
