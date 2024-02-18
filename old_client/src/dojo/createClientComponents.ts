import { overridableComponent } from "@latticexyz/recs";
import { SetupNetworkResult } from "./setupNetwork";


export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({ contractComponents }: SetupNetworkResult) {
    return {
        ...contractComponents,
        Player: overridableComponent(contractComponents.Player),
        CurrentDungeon: overridableComponent(contractComponents.CurrentDungeon),
        Hero1: overridableComponent(contractComponents.Hero1),
        Hero2: overridableComponent(contractComponents.Hero2),
        Hero3: overridableComponent(contractComponents.Hero3),
    };
}