// constants/skins.ts
export const SKINS = [
    { id: "default", name: "Drone 1", source: require("@/assets/images/drone.png") },
    { id: "default2", name: "Drone 2", source: require("@/assets/images/drone2.png") },
    { id: "default3", name: "Drone 3", source: require("@/assets/images/drone3.png") },
    
];

export type Skin = typeof SKINS[number];