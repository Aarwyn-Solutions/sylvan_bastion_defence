import { type } from 'os';
import React from 'react';
import { Hero1, Hero2, Hero3 } from '../generated/graphql';
import { Account, Signer } from 'starknet';
import { HeroType } from '../dojo/types';


type HeroesProps = {
    hero1: Hero1, hero2: Hero2, hero3: Hero3, signer: Account, hire: (signer: Account, position: number, hero: HeroType) => void
}


const Heroes: React.FC<HeroesProps> = ({ hero1, hero2, hero3, signer, hire }) => {

    const heroesStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        width: '100%',
        margin: '0 auto',
    };

    const child = {
    };

    return (

        <div style={heroesStyle}>
            <button style={child} onClick={() => hire(signer, 1, HeroType.Archer)}>
                <img width="90px" src="./src/assets/game/heroes/plus.png" alt="Hero 1" />
                <div>exp :</div>
            </button>
            <button style={child} onClick={() => hire(signer, 2, HeroType.Archer)}>
                <img width="90px" src="./src/assets/game/heroes/plus.png" alt="Hero 2" />
                <div>exp :</div>
            </button>
            <button style={child} onClick={() => hire(signer, 3, HeroType.Archer)}>
                <img width="90px" src="./src/assets/game/heroes/plus.png" alt="Hero 3" />
                <div>exp :</div>
            </button>
        </div>

    );
}

export default Heroes;
