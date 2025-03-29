import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Pauses from "@/modules/Pauses";
import Stats from "@/modules/Stats";
import Streak from "@/modules/Streak";
import Timer from "@/modules/Timer";
import Variables from "@/modules/Variables";
import CommandMenu from "@/modules/CommandMenu.tsx";
import FloatingAdvice from "@/components/FloatingAdvice";

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
        minSize={25}
        className="border-x flex justify-center items-center"
      >
        <ResizablePanelGroup direction="vertical" className="min-h-screen">
          <Variables />
          <ResizableHandle withHandle />
          <Timer />
          <ResizableHandle withHandle />
          <Streak />
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <Stats />
      <CommandMenu />
      <FloatingAdvice />
    </ResizablePanelGroup>
  );
}

export default App;
