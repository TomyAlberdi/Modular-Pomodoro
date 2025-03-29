import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const FloatingAdvice = () => {
  return (
    <Alert className="w-auto absolute bottom-2 right-2">
      <Terminal />
      <AlertTitle>Ctrl + K</AlertTitle>
      <AlertDescription>Command Menu</AlertDescription>
    </Alert>
  );
};
export default FloatingAdvice;
