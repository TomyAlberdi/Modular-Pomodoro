import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Pauses from "@/modules/Pauses";
import Stats from "@/modules/Stats";
import Streak from "@/modules/Streak";
import Timer from "@/modules/timer";
import Variables from "@/modules/Variables";

function App() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="App min-h-screen min-w-screen bg-custom-main flex justify-center items-center overflow-hidden"
    >
      <Pauses />
      <ResizableHandle withHandle />
      <ResizablePanel
        defaultSize={34}
        className="border min-h-screen flex justify-center items-center"
      >
        <ResizablePanelGroup direction="vertical" className="">
          <Variables />
          <ResizableHandle withHandle />
          <Timer />
          <ResizableHandle withHandle />
          <Streak />
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <Stats />
    </ResizablePanelGroup>
  );
}

export default App;
