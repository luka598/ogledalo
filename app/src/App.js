import Messages from "./components/messages/messages.js"
import Clock from "./components/clock.js"
import Radar from "./components/radar.js"
import Weather from "./components/weather/weather.js"

function App() {
  return (
    <div className="m-2 w-[800px] h-[600px] bg-black border-2 relative grid gap-4 grid-cols-3 grid-rows-3 p-4">
      <div className="col-start-3 row-start-1 flex items-center justify-center"> <Clock/> </div>
      <div className="col-start-3 row-start-2 row-span-2 flex"> <Messages/> </div>
      <div className="col-start-1 row-start-2 flex items-center justify-center"> <Radar/> </div>
      <div className="col-start-1 row-start-1 flex items-center justify-center"> <Weather/> </div>
  </div>
      
  );
}

export default App;
