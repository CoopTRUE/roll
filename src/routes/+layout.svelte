<script lang="ts">
  import 'normalize.css'
  import '../global.scss'
  import Header from './Header.svelte'
  import Footer from './Footer.svelte'
</script>

<Header />
<slot />
<Footer />
