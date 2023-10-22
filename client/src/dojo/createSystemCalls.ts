import { SetupNetworkResult } from "./setupNetwork";
import { Account } from "starknet";
import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { updatePositionWithDirection } from "../utils";
import { getEvents, setComponentsFromEvents } from "@dojoengine/utils";
import { Artifact, DungeonType, HeroType } from "./types";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Player, CurrentDungeon }: ClientComponents
) {

    const create_player = async (signer: Account) => {

        const entityId = signer.address.toString() as EntityIndex;

        const playerId = uuid();
        Player.addOverride(playerId, {
            entity: entityId,
            value: {
                exp: 0,
                gold: 100,
                in_dungeon: false,
                pos_1: {
                    hero_type: HeroType.None,
                    item_1: Artifact.None,
                    item_2: Artifact.None,
                    exp: 0,
                },
                pos_2: {
                    hero_type: HeroType.None,
                    item_1: Artifact.None,
                    item_2: Artifact.None,
                    exp: 0,
                },
                pos_3: {
                    hero_type: HeroType.None,
                    item_1: Artifact.None,
                    item_2: Artifact.None,
                    exp: 0,
                },
                pos_4: {
                    hero_type: HeroType.None,
                    item_1: Artifact.None,
                    item_2: Artifact.None,
                    exp: 0,
                },
                pos_5: {
                    hero_type: HeroType.None,
                    item_1: Artifact.None,
                    item_2: Artifact.None,
                    exp: 0,
                },
            },
        });

        const dungeonId = uuid();
        CurrentDungeon.addOverride(dungeonId, {
            entity: entityId,
            // value: {
            //     dungeon_type: DungeonType.None,
            //     current_room: 0,
            //     squad_health: 0,
            // },
            value: getComponentValue(CurrentDungeon, entityId)
        });

        try {
            const tx = await execute(signer, "actions", 'create_player', []);
            setComponentsFromEvents(contractComponents,
                getEvents(
                    await signer.waitForTransaction(tx.transaction_hash,
                        { retryInterval: 100 }
                    )
                )
            );

        } catch (e) {
            console.log(e)
            Player.removeOverride(playerId);
            CurrentDungeon.removeOverride(dungeonId);
        } finally {
            Player.removeOverride(playerId);
            CurrentDungeon.removeOverride(dungeonId);
        }
    };

    // const move = async (signer: Account, direction: Direction) => {
    //     const entityId = signer.address.toString() as EntityIndex;

    //     const positionId = uuid();
    //     Position.addOverride(positionId, {
    //         entity: entityId,
    //         value: updatePositionWithDirection(direction, getComponentValue(Position, entityId)),
    //     });

    //     const movesId = uuid();
    //     Moves.addOverride(movesId, {
    //         entity: entityId,
    //         value: { remaining: (getComponentValue(Moves, entityId)?.remaining || 0) - 1 },
    //     });

    //     try {
    //         const tx = await execute(signer, "actions", "move", [direction]);
    //         setComponentsFromEvents(contractComponents,
    //             getEvents(
    //                 await signer.waitForTransaction(tx.transaction_hash,
    //                     { retryInterval: 100 }
    //                 )
    //             )
    //         );

    //     } catch (e) {
    //         console.log(e)
    //         Position.removeOverride(positionId);
    //         Moves.removeOverride(movesId);
    //     } finally {
    //         Position.removeOverride(positionId);
    //         Moves.removeOverride(movesId);
    //     }

    // };

    return {
        create_player
    };
}

export enum Direction {
    Left = 1,
    Right = 2,
    Up = 3,
    Down = 4,
}
