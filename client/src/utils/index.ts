import { HeroType } from "../dojo/types";
import { Player } from "../generated/graphql";

export function defaultHero(hero: HeroType) {
    return {
        hero_type: hero,
        exp: 0
    };
}

export function defaulPlayer(): Player {
    return {
        exp: 0,
        gold: 100,
    };
}

