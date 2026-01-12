import { lazy } from "react";

import classNames from "classnames";
import { Text } from "shared/widgets";
const RemoteApp = lazy(() => import("remote/remoteApp"));
const HelloWorld = lazy(() => import("helloWorld/remoteApp"));
import "./App.css";

function App() {
  const containerClass = classNames("app-container", "active", "visible");

  return (
    <div className={containerClass}>
      <Text value="Hello from Host!" />
      <RemoteApp />
      <HelloWorld />
    </div>
  );
}

export default App;
