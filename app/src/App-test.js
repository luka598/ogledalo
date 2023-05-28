import Messages from "./components/messages/messages.js"
import Clock from "./components/clock.js"

function App() {
  return (
    <div className="m-2 w-[800px] h-[600px] bg-black border-2 relative">
      <div className="absolute left-1/2 top-1/2">
        <Clock/>
      </div>
  </div>
  );
}

export default App;
