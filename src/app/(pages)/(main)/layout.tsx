import Navbar from "@/components/layout/Navbar/Navbar";
import MainLayoutCom from "./MainLayout";
import { PeerProvider } from "@/context/Peer";
import { WebSocketProvider } from "@/context/webSocketContext";
// import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebSocketProvider>
      <PeerProvider>
        {/* FULL PAGE FLEX LAYOUT */}
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#007b8f] via-[#00a085] to-[#00c49a] text-white">
          {/* TOP NAVBAR */}
          <Navbar />

          {/* CONTENT (TAKES AVAILABLE SPACE) */}
          <main className="flex-1 relative overflow-hidden pb-24 md:pb-0">
            <MainLayoutCom>{children}</MainLayoutCom>
          </main>

          {/* FIXED FOOTER POSITION */}
          {/* <Footer /> */}
        </div>
      </PeerProvider>
    </WebSocketProvider>
  );
}
