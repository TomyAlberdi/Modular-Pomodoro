import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/context/theme-provider.tsx";
import TimerContextComponent from "@/context/TimerContextComponent.tsx";
import PanelContextComponent from "@/context/PanelContextComponent.tsx";

createRoot(document.getElementById("root")!).render(
  <PanelContextComponent>
    <TimerContextComponent>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </TimerContextComponent>
  </PanelContextComponent>
);
