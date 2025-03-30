import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface FloatingAdviceProps {
  Open: boolean;
  setOpen: (Open: boolean) => void;
}

const FloatingAdvice = ({ Open, setOpen }: FloatingAdviceProps) => {
  return (
    <Alert
      className="w-auto absolute bottom-2 right-2 cursor-pointer"
      onClick={() => setOpen(!Open)}
    >
      <Terminal />
      <AlertTitle>Command Menu</AlertTitle>
      <AlertDescription>Ctrl + K</AlertDescription>
    </Alert>
  );
};
export default FloatingAdvice;
