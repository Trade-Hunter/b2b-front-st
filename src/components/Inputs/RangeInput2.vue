<template>
  <div class="relative">
    <div class="slider-wrapper">
      <div class="w-full">
        <input
          v-bind:id="'range-slider.' + myref"
          @input="showSliderValue"
          :value="Number(value)"
          class="w-full fluid-slider border-l border-r"
          type="range"
          :min="min"
          :max="max" />
      </div>
      <span v-bind:id="'range-label.' + myref" class="range-label top-0 -py-3 absolute text-xs text-center" style="width: 20px">0</span>
    </div>
  </div>
</template>

<script>
import HxcLabel from '@/components/Labels/Label.vue';
export default {
  name: 'hxc-range-input',
  components: {
    HxcLabel,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    myref: { type: String },
  },

  mounted() {
    this.showSliderValue();
  },

  methods: {
    showSliderValue() {
      var rangeSlider = document.getElementById('range-slider.' + this.myref);
      var rangeLabel = document.getElementById('range-label.' + this.myref);

      rangeLabel.innerHTML = rangeSlider.value;

      this.$emit('update:value', Number(rangeSlider.value));
      var labelPosition = rangeSlider.value / rangeSlider.max;

      rangeSlider.style['-webkit-slider-thumb'] = {
        width: '200px',
      };
      if (rangeSlider.value === rangeSlider.min) {
        rangeLabel.style.left = labelPosition * 100 + 2 + '%';
      } else if (rangeSlider.value === rangeSlider.max) {
        rangeLabel.style.left = labelPosition * 100 - 5 + '%';
      } else {
        rangeLabel.style.left = (rangeSlider.offsetWidth - 20) * Number(labelPosition) + 'px';
      }
    },
  },
};
</script>

<style>
.fluid-slider {
  -webkit-appearance: none;

  background: #c20042;
  height: 5px;
  margin-bottom: 1px;
  margin-top: 1px;
  position: relative;
}

/* input[type='range']::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  height: 15px;
  width: 20px;
  border-radius: 5px;
  background: #ff2626;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3.5px;
} */

input[type='range'] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
  background: #ffffff78;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type='range']:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type='range']::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  /* background: transparent; */
  border-color: transparent;
  color: transparent;
}

/* Special styling for WebKit/Blink */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 15px;
  width: 15px;
  border-radius: 10px;
  background: #ffffff;
  cursor: pointer;
}

/* All the same stuff for Firefox */
input[type='range']::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 15px;
  width: 20px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

/* All the same stuff for IE */
input[type='range']::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 15px;
  width: 5px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
</style>
