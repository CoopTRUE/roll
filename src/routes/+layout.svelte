<script lang="ts">
  import 'normalize.css'
  import '../global.scss'
  import { browser } from '$app/environment'
  import { socket } from '$lib/stores'
  if (browser) {
    // wait 10 seconds for the socket to connect
    if ($socket.connected) console.log('CONNECTED TO REALTIME')
    else $socket.on('connect', () => console.log('CONNECTED TO REALTIME'))
    $socket.on('message', console.log)
    // console log any messages from the server
  }
</script>

<slot />
