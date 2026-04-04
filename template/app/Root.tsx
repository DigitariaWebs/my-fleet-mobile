import { Outlet } from "react-router";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function RootContent() {
  const { colors } = useTheme();
  
  return (
    <div className="min-h-screen w-full max-w-[390px] mx-auto relative" style={{ background: colors.background }}>
      <Outlet />
    </div>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <RootContent />
    </ThemeProvider>
  );
}