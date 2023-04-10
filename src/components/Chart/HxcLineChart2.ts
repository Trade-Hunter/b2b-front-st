//import HxcMenu from "@/components/Menu/index.vue";
import Highcharts from "highcharts";
//import Exporting from "highcharts/modules/exporting";
import More from "highcharts/highcharts-more";
//DrilChart(Highcharts);
//SeriesLabel(Highcharts);
//Exporting(Highcharts);
More(Highcharts);

import { defineComponent, toRef, ref, computed, watchEffect, h, onMounted, onUnmounted, watch, toRefs } from "vue";
import { useStore } from "vuex";
var themeOptions: any = {
  dark: {
    //colors: ["#68a3ed", "#01c3be"],
    chart: {
      borderWidth: 0,
      plotBackgroundColor: null,
      plotShadow: false,
      animation: true,
      spacingTop: 15,
      spacingRight: 5,
      spacingBottom: 0,
      spacingLeft: 5,
      plotBorderWidth: 0,
      backgroundColor: "transparent",
      //scrollablePlotArea: {
      //minHeight: 200,
      //minWidth: 900,
      //opacity: 85,
      //scrollPositionX: 1,
      //},
      selectionMarkerFill: "rgba(51,92,173,0.25)",
      style: {
        fontFamily: "system-ui",
        fontSize: "12px",
      },
    },
    legend: {
      color: "#000",
      itemStyle: { color: "#e6f1ff", fontFamily: "system-ui" },
      align: "center",
    },
    title: {
      style: {
        fontWeight: "400",
        color: "#0886fc",
        fontSize: "18px",
        fontFamily: "system-ui",
      },
    },
    subtitle: {
      style: { color: "#cedced", fontFamily: "system-ui" },
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: "#687ea8",
      title: {
        style: {
          color: "#0886fc",
          fontFamily: "system-ui",
        },
      },
      crosshair: {
        snap: false,
      },
      labels: { style: { color: "#e6f1ff", fontFamily: "system-ui" } },
    },

    xAxis: {
      crosshair: {
        snap: false,
      },
      tickLength: 0,
      gridLineWidth: 0,
      title: {
        style: { color: "#e6f1ff", fontFamily: "system-ui" },
      },
      labels: { style: { color: "#e6f1ff", fontFamily: "system-ui" } },
    },
    plotOptions: {
      //series: { showInLegend: true },
      spline: {
        stickyTracking: false,
        color: "#f15c80",
        dataLabels: {
          color: "#e6f1ff",
        },
      },
      column: {
        borderWidth: 0,
        borderColor: "#0000",
        stacking: "normal",
        pointPadding: 0,
        pointWidth: 6,
      },
    },
    series: {
      //lineColor: "#14db64",
      //color: "#14db64",
    },

    credits: {
      enabled: true,
      href: "https://tradehunter.app",
      text: "fonte: tradehunter.app",
      position: {
        align: "right",
        verticalAlign: "bottom",
        x: -10,
        y: -25,
      },
      style: {
        color: "#3B82F6",
        cursor: "pointer",
        fontSize: "12px",
      },
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: "#3B82F6",
        cursor: "pointer",
        fontWeight: "400",
        textDecoration: "none",
      },
      activeDataLabelStyle: {
        color: "#003399",
        cursor: "pointer",
        fontWeight: "bold",
        textDecoration: "underline",
      },
      breadcrumbs: {
        buttonSpacing: 5,
        style: { color: "#fff" },
        buttonTheme: { style: { color: "#fff" } },
        floating: true,
        relativeTo: "plotBox",
        separator: {
          style: {
            color: "#fff",
          },
          text: "→",
        },
      },
    },
    labels: { style: { color: "#333333", position: "absolute" } },
    loading: {
      hideDuration: 100,
      labelStyle: { fontWeight: "bold", position: "relative", top: "45%" },
      showDuration: 100,
      style: {
        position: "absolute",
        backgroundColor: "#ffffff",
        opacity: 0.5,
        textAlign: "center",
      },
    },
  },
  light: {
    //colors: ["#68a3ed", "#01c3be"],
    chart: {
      backgroundColor: "transparent",
    },
    legend: {
      itemStyle: { color: "#333333", fontFamily: "system-ui" },
    },
    title: {
      style: {
        fontWeight: "500",
        color: "#333333",
        fill: "#333333",
        fontSize: "18px",
        fontFamily: "system-ui",
      },
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
        //color: "#fff",
        dataLabels: {
          color: "#333333",
        },
      },
    },
    series: {
      //lineColor: "#68a3ed",
      //color: "#68a3ed",
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
    const chart = ref(null);
    const store = useStore();

    const ca = computed(() => store.state.theme);
    //const c2 = computed(() => store.state.theme.collapsed);

    //const windowSize = computed(() => store.state.theme.collapsed);
    const { options } = toRefs(props);
    console.log("props type", props.type);

    if (options.value && (Highcharts as any)[props.type]) {
      watch(
        options,
        (newValue) => {
          if (chart.value) {
            (chart.value as any).update(
              { ...themeOptions[ca.value.theme], ...newValue },
              props.redrawOnUpdate,
              (props as any).oneToOneOnUpdate,
              props.animateOnUpdate
            );
            emit("updated");
          }
        },
        { deep: true }
      );

      watch(
        ca,
        (newValue) => {
          console.log("triggered theme change highcharts component", newValue);
          console.log("chart is", chart.value);
          if (chart.value) {
            console.log("new value is", newValue);
            console.log("options value is", options.value);
            setTimeout(() => {
              (chart.value as any).update(
                {
                  ...(options.value as any),
                  ...themeOptions[newValue.theme],
                },
                true,
                (props as any).oneToOneOnUpdate,
                props.animateOnUpdate
              );
              emit("updated");
            }, 310);
          }
        },
        { deep: true }
      );

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
        //themeOptions[ca.value].yAxis.title.text = options.value["yAxis"]?.title?.text;
        for (var key of Object.keys(themeOptions[ca.value.theme])) {
          if (!options.value[key]) {
          } else {
            //console.log(key, Array.isArray(options.value[key]));
            options.value[key] = Array.isArray(options.value[key])
              ? Object.keys(options.value[key]).map((item: any) => {
                  return {
                    ...themeOptions[ca.value.theme][key][item],
                    ...options.value[key][item],
                  };
                })
              : { ...options.value[key], ...themeOptions[ca.value.theme][key] };
          }
        }
        chart.value = (Highcharts as any).chart(chartRef.value, options.value, () => {
          emit("rendered");
        });
      });

      onUnmounted(() => {
        if (chart.value) (chart.value as any).destroy();
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
