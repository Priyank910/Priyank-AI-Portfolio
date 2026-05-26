import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageHome from "./pages/PageHome.jsx";
import PageAbout from "./pages/PageAbout.jsx";
import PageProjects from "./pages/PageProjects.jsx";
import PageExperience from "./pages/PageExperience.jsx";
import PageContact from "./pages/PageContact.jsx";
import AIChatBot from "./components/AIChatBot.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import PageTransition from "./components/PageTransition.jsx";

function AppShell() {
  const location = useLocation();
  const [inlineChatRequest, setInlineChatRequest] = useState(null);
  const [chatOpenExternal, setChatOpenExternal] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState(undefined);

  const showFloatingChat = location.pathname !== "/";

  const handleOpenAIChat = (prompt) => {
    const defaultPrompt = "Summarize Priyank in 30 seconds.";

    if (location.pathname === "/") {
      setInlineChatRequest({
        message: prompt || defaultPrompt,
        ts: Date.now(),
      });
      return;
    }

    setChatInitialMessage(prompt || defaultPrompt);
    setChatOpenExternal(true);
  };

  return (
    <SmoothScroll>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
        <Navbar onOpenAIChat={handleOpenAIChat} />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 md:py-16">
          <Routes>
            <Route element={<PageTransition />}>
              <Route
                path="/"
                element={
                  <PageHome
                    onOpenAI={handleOpenAIChat}
                    inlineChatRequest={inlineChatRequest}
                  />
                }
              />
              <Route path="/about" element={<PageAbout />} />
              <Route path="/projects" element={<PageProjects />} />
              <Route path="/experience" element={<PageExperience />} />
              <Route path="/contact" element={<PageContact />} />
            </Route>
          </Routes>
        </main>

        <footer className="border-t border-white/5 bg-[#050505] py-8 px-4 text-center">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-xs font-sans">
            <p>© 2026 Priyank Chavda. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              This Website is Created with{" "}
              <span className="text-cyan-400 font-semibold font-mono">AI</span>
            </p>
          </div>
        </footer>

        {showFloatingChat && (
          <AIChatBot
            initialMessage={chatInitialMessage}
            isOpenExternal={chatOpenExternal}
            onCloseExternal={() => {
              setChatOpenExternal(false);
              setChatInitialMessage(undefined);
            }}
          />
        )}
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
