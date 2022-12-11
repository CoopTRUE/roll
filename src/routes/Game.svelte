<script lang="ts">
  import Side from './Side.svelte'
  import { Chart, LineSeries } from 'svelte-lightweight-charts'
  import { onMount } from 'svelte'

  let windowWidth: number
  let windowHeight: number
  $: gameWidth = windowWidth - 350
  $: gameHeight = windowHeight - 400

  let data: { time: string; value: number }[] = [{ time: '2000-1-1', value: 0 }]
  let rate = 1.5
  function simulateData() {
    for (let i = 0; i < 10000; i++) {
      setTimeout(() => {
        data = [...data, { time: 2000 + i + '-1-1', value: (i / 500) * rate }]
        rate += 0.005
      }, i * 20)
    }
  }

  onMount(simulateData)
  function tickMarkFormatter({ year }: { year: number }) {
    year -= 2000
    const r = year % 5 ? '' : year - 39 + 's'
    return r
  }
  function priceFormatter(price: number) {
    return price.toFixed(2) + 'x'
  }
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />
<main>
  <Side />
  <div class="chart-wrapper">
    <h2 />
    <Chart
      width={gameWidth}
      height={gameHeight}
      timeScale={{ tickMarkFormatter }}
      localization={{ priceFormatter, timeFormatter: () => '' }}
    >
      <LineSeries {data} color="#61DD4C" reactive={true} />
    </Chart>
  </div>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }
  .container {
    background: red;
  }
</style>
