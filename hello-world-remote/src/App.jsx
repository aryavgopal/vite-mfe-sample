import { Text } from "shared/widgets";
import classNames from "classnames";
import "./App.css";

function App() {
  const containerClass = classNames("app-container", "active", "visible");

  return (
    <div className={containerClass}>
      <Text value="Hello from HelloWorld App!" />
    </div>
  );
}

export default App;
