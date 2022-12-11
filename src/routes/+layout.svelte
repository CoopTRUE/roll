<script lang="ts">
  import 'normalize.css'
  import '../global.scss'
  import { PUBLIC_ABLY_KEY } from '$env/static/public'
  import Ably from 'ably'
  import { browser } from '$app/environment'
  if (browser) {
    const ably = new Ably.Realtime(PUBLIC_ABLY_KEY)
    const channel = ably.channels.get('gameStatus')
    channel.subscribe('update', (message) => {
      console.log(message)
    })
  }
</script>

<slot />
