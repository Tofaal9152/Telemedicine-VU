import Navbar from "@/components/layout/Navbar/Navbar";
import MainLayoutCom from "./MainLayout";
import { PeerProvider } from "@/context/Peer";
import { WebSocketProvider } from "@/context/webSocketContext";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebSocketProvider>
      <PeerProvider>
        <div>
          <div className="bg-gradient-to-br from-[#007b8f] via-[#00a085] to-[#00c49a] text-white relative overflow-hidden pb-24 md:pb-0">
            <Navbar />
            <MainLayoutCom>{children}</MainLayoutCom>
          </div>
          <Footer />
        </div>
      </PeerProvider>
    </WebSocketProvider>
  );
}
