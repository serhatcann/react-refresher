import { createElement as h } from "react";

function App()
{
  return h("div",
    null,
    h("h1", null, "Hello"),
    h("p", null, "This is SSG"));
}

export default App;