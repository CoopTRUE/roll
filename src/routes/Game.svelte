<script lang="ts">
  import Side from './Side.svelte'
  import { Chart, LineSeries } from 'svelte-lightweight-charts'
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'

  let windowWidth: number
  let windowHeight: number
  $: gameWidth = windowWidth - 350
  $: gameHeight = windowHeight - 400

  const updateRate = 20

  let data: { time: number; value: number }[] = []
  let rate = 1.5
  let multiplier = 0
  function simulateData() {
    for (let i = 0; i < 1000; i++) {
      setTimeout(() => {
        multiplier = (i / 500) * rate
        data = [...data, { time: i, value: multiplier }]
        rate += 0.009
      }, i * updateRate)
    }
  }

  onMount(simulateData)
  function timeFormatter(t: number) {
    t /= 1000 / updateRate
    return Math.floor(t) + 's'
  }
  function priceFormatter(price: number) {
    return price.toFixed(2) + 'x'
  }

  let borderColor: string
  if (browser) {
    borderColor = getComputedStyle(document.documentElement).getPropertyValue(
      '--color-border-secondary'
    )
  }
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />
<main>
  <Side />
  <div class="chart-wrapper">
    <h2>{multiplier.toFixed(2)}x</h2>
    <Chart
      width={gameWidth}
      height={gameHeight}
      timeScale={{ tickMarkFormatter: timeFormatter, rightOffset: 10 }}
      localization={{ priceFormatter, timeFormatter: () => '' }}
      layout={{ textColor: '#98A2B3' }}
      grid={{ horzLines: { color: borderColor }, vertLines: { color: borderColor } }}
      handleScroll={false}
      handleScale={false}
      crosshair={{
        vertLine: { visible: false, labelVisible: false },
        horzLine: { visible: false, labelVisible: false }
      }}
    >
      <LineSeries
        {data}
        color="#61DD4C"
        reactive={true}
        lastValueVisible={false}
        priceLineVisible={false}
        crosshairMarkerVisible={false}
      />
    </Chart>
    <img src="/images/logo.svg" alt="" />
  </div>
</main>

<style>
  main {
    display: flex;
    height: 100vh;
  }
  .chart-wrapper {
    display: grid;
    place-items: center;
    position: relative;
  }
  h2 {
    position: absolute;
    z-index: 5;
    font-weight: 700;
    font-size: 200px;
    color: #eeeeee;
    user-select: none;
  }
  img {
    position: absolute;
    z-index: 5;
    width: 50px;
    right: 70px;
    top: 225px;
  }
</style>
