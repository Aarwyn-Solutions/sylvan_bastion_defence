import { Artifact, HeroType } from "../dojo/types";
import { Player } from "../generated/graphql";

export function hireHero(player: Player, pos: number, hero: HeroType): Player {
    if (pos < 0 || pos > 5) {
        throw ("wrong position")
    } else if (pos == 1) {
        player.pos_1 = {
            hero_type: hero,
            item_1: Artifact.None,
            item_2: Artifact.None,
            exp: 0
        }
    }
    //todo
    return player;
}

export function defaulPlayer(): Player {
    return {
        exp: 0,
        gold: 100,
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
    };
}

