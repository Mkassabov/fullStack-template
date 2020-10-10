<script>
  import "./services/firebase";
  import "./services/api/index";
  import { Router, Route } from "svelte-routing";
  import Home from "./routes/Home.svelte";
  export let url = "";
</script>

<style>
  div {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    div {
      max-width: none;
    }
  }
</style>

<Router {url}>
  <div>
    <Route path="/">
      <Home />
    </Route>
    <Route path="/test">
      <p>test</p>
    </Route>
  </div>
</Router>
