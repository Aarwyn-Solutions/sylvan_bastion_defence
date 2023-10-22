import { SetupNetworkResult } from "./setupNetwork";
import { Account, BigNumberish } from "starknet";
import { EntityIndex, getComponentValue } from "@latticexyz/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { defaulPlayer, defaultHero, hireHero } from "../utils";
import { getEvents, setComponentsFromEvents } from "@dojoengine/utils";
import { Artifact, DungeonType, HeroType } from "./types";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, contractComponents }: SetupNetworkResult,
    { Player, CurrentDungeon, Hero1, Hero2, Hero3 }: ClientComponents
) {

    const create_player = async (signer: Account) => {

        const entityId = signer.address.toString() as EntityIndex;

        const playerId = uuid();
        Player.addOverride(playerId, {
            entity: entityId,
            value: defaulPlayer()
        });

        const dungeonId = uuid();
        CurrentDungeon.addOverride(dungeonId, {
            entity: entityId,
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

    const hire_hero = async (signer: Account, position: number, hero: HeroType) => {
        const entityId = signer.address.toString() as EntityIndex;

        const playerId = uuid();
        Player.addOverride(playerId, {
            entity: entityId,
            value: getComponentValue(Player, entityId)
        });

        const dungeonId = uuid();
        CurrentDungeon.addOverride(dungeonId, {
            entity: entityId,
            value: getComponentValue(CurrentDungeon, entityId)
        });

        const heroId = uuid();

        if (position <= 0 || position > 3) {
            throw ("wrong position")
        } else if (position == 1) {
            Hero1.addOverride(heroId, {
                entity: entityId,
                value: defaultHero(hero),
            })
        } else if (position == 2) {
            Hero2.addOverride(heroId, {
                entity: entityId,
                value: defaultHero(hero),
            })
        } else if (position == 3) {
            Hero3.addOverride(heroId, {
                entity: entityId,
                value: defaultHero(hero),
            })
        }

        try {
            const tx = await execute(signer, "actions", 'hire_hero', [position as BigNumberish, hero]);
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
            if (position <= 0 || position > 3) {
                throw ("wrong position")
            } else if (position == 1) {
                Hero1.removeOverride(heroId);
            } else if (position == 2) {
                Hero2.removeOverride(heroId);
            } else if (position == 3) {
                Hero3.removeOverride(heroId);
            }
        } finally {
            Player.removeOverride(playerId);
            CurrentDungeon.removeOverride(dungeonId);
            if (position <= 0 || position > 3) {
                throw ("wrong position")
            } else if (position == 1) {
                Hero1.removeOverride(heroId);
            } else if (position == 2) {
                Hero2.removeOverride(heroId);
            } else if (position == 3) {
                Hero3.removeOverride(heroId);
            }
        }
    }

    const enter_dungeon = async (signer: Account, dungeon_type: DungeonType, gold: Number) => {
        const entityId = signer.address.toString() as EntityIndex;

        const playerId = uuid();
        Player.addOverride(playerId, {
            entity: entityId,
            value: getComponentValue(Player, entityId)
        });

        const dungeonId = uuid();
        CurrentDungeon.addOverride(dungeonId, {
            entity: entityId,
            value: getComponentValue(CurrentDungeon, entityId)
        });

        const heroId1 = uuid();
        Hero1.addOverride(heroId1, {
            entity: entityId,
            value: getComponentValue(Hero1, entityId)
        });

        try {
            const tx = await execute(signer, "actions", 'enter_dungeon', [dungeon_type, gold as BigNumberish]);
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
            Hero1.removeOverride(heroId1);
        } finally {
            Player.removeOverride(playerId);
            CurrentDungeon.removeOverride(dungeonId);
            Hero1.removeOverride(heroId1);
        }
    }

    const next_room = async (signer: Account) => {
        const entityId = signer.address.toString() as EntityIndex;

        const playerId = uuid();
        Player.addOverride(playerId, {
            entity: entityId,
            value: getComponentValue(Player, entityId)
        });

        const dungeonId = uuid();
        CurrentDungeon.addOverride(dungeonId, {
            entity: entityId,
            value: getComponentValue(CurrentDungeon, entityId)
        });

        try {
            const tx = await execute(signer, "actions", 'next_room', []);
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
    }

    const leave_dungeon = async (signer: Account) => {
        const entityId = signer.address.toString() as EntityIndex;

        const playerId = uuid();
        Player.addOverride(playerId, {
            entity: entityId,
            value: getComponentValue(Player, entityId)
        });

        const dungeonId = uuid();
        CurrentDungeon.addOverride(dungeonId, {
            entity: entityId,
            value: getComponentValue(CurrentDungeon, entityId)
        });

        try {
            const tx = await execute(signer, "actions", 'leave_dungeon', []);
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
    }



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
        create_player,
        hire_hero,
        enter_dungeon,
        next_room,
        leave_dungeon,
    };
}