import { ViewControls } from "@/components/debug/ViewControls";
import { BreadcrumbBanner } from "@/components/layout/BreadcrumbBanner";
import { FooterBar } from "@/components/layout/FooterBar";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { ViewportContainer } from "@/components/layout/ViewportContainer";
import { ChangeSizeModal } from "@/components/modals/ChangeSizeModal";
import { ServeTypeModal } from "@/components/modals/ServeTypeModal";
import { CategoryGrid } from "@/components/section-1-categories/CategoryGrid";
import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { OrderDisplayShell } from "@/components/section-3-order/OrderDisplayShell";
import { FinalizeShell } from "@/components/section-4-finalize/FinalizeShell";
import { usePosStore } from "@/store/usePosStore";
import React from "react";

export const App: React.FC = () => {
  const activeModal = usePosStore((state) => state.activeModal);
  const openModal = usePosStore((state) => state.openModal);
  const closeModal = usePosStore((state) => state.closeModal);

  return (
    <>
      <ViewportContainer>
        {/* Top Status Header */}
        <HeaderBar />

        {/* Main POS Interface Body */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Column: Sections III & IV */}
          <div className="w-[32%] flex flex-col border-r border-[#64748b] bg-[#cbd5e1]/20">
            <OrderDisplayShell />
            <FinalizeShell />
          </div>

          {/* Right Column: Sections I & II and Breadcrumb */}
          <div className="w-[68%] flex flex-col bg-[#e2e8f0]">
            <CategoryGrid />
            <BreadcrumbBanner />
            <ItemGrid onChangeSizeClick={() => openModal("change_size")} />
          </div>
        </main>

        {/* Bottom Status Strip */}
        <FooterBar />
      </ViewportContainer>

      {/* Modals */}
      <ServeTypeModal
        mode={activeModal === "serve_type_item" ? "item" : "all"}
        isOpen={activeModal === "serve_type_all" || activeModal === "serve_type_item"}
        onClose={closeModal}
      />

      <ChangeSizeModal
        isOpen={activeModal === "change_size"}
        onClose={closeModal}
      />

      {/* Floating Viewport & Debug Overlay */}
      <ViewControls />
    </>
  );
};

export default App;
