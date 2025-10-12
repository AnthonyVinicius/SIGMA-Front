<template>
  <div class="w-full h-80">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  chartData: {
    type: Object,
    required: true, // { labels: [...], datasets: [...] }
  },
  chartOptions: {
    type: Object,
    default: () => ({ responsive: true, plugins: { legend: { position: 'top' } } })
  },
  chartType: {
    type: String,
    default: 'bar' // bar, pie, line, doughnut etc.
  }
});

let chartInstance = null;
const chartRef = ref(null);

onMounted(() => {
  if (chartRef.value) {
    chartInstance = new Chart(chartRef.value, {
      type: props.chartType,
      data: props.chartData,
      options: props.chartOptions
    });
  }
});

// Atualiza o gráfico quando os dados mudam
watch(() => props.chartData, (newData) => {
  if (chartInstance) {
    chartInstance.data = newData;
    chartInstance.update();
  }
}, { deep: true });
</script>

<style scoped>
canvas {
  max-width: 100%;
}
</style>
