<script lang="ts">
  import Side from './Side.svelte'
  import { Chart, LineSeries } from 'svelte-lightweight-charts'
  import { onMount } from 'svelte'

  let data: { time: string; value: number }[] = [{ time: '2000-1-1', value: 0 }]
  function simulateData() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        data = [...data, { time: 2000 + i + '-1-1', value: i + Math.random() }]
      }, 1000 * i)
    }
  }

  onMount(simulateData)
  function tickMarkFormatter({ year }: { year: number }) {
    return year - 2000 + 's'
  }
  function priceFormatter(price: number) {
    return price.toFixed(2) + 'x'
  }
</script>

<main>
  <Side />
  <Chart
    width={600}
    height={300}
    timeScale={{ tickMarkFormatter: tickMarkFormatter }}
    localization={{ priceFormatter }}
  >
    <LineSeries {data} color="#61DD4C" reactive={true} />
  </Chart>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }
  .container {
    flex: 1;
    background: red;
  }
</style>
