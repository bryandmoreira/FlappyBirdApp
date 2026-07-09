// hooks/skin.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { SKINS, Skin } from "@/constants/skins";

interface SkinContextData {
  skin: Skin;
  setSkinId: (id: string) => void;
}

const SkinContext = createContext<SkinContextData>({} as SkinContextData);

export function SkinProvider({ children }: { children: ReactNode }) {
  const [skin, setSkin] = useState<Skin>(SKINS[0]);

  function setSkinId(id: string) {
    const found = SKINS.find((s) => s.id === id);
    if (found) setSkin(found);
  }

  return (
    <SkinContext.Provider value={{ skin, setSkinId }}>
      {children}
    </SkinContext.Provider>
  );
}

export function useSkin() {
  return useContext(SkinContext);
}