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

    const heroesStore = (<div style={heroesStyle}>
        <img width="40px" src="./src/assets/game/heroes/Ranger.jpg" />
        <img width="40px" src="./src/assets/game/heroes/Druid.jpg" />
        <img width="40px" src="./src/assets/game/heroes/Guardian.jpg" />
        <img width="40px" src="./src/assets/game/heroes/Knight.jpg" />
        <img width="40px" src="./src/assets/game/heroes/Shaman.jpg" />
        <img width="40px" src="./src/assets/game/heroes/Vendigo.jpg" />
    </div>)

    return (
        <>
            <div style={heroesStyle}>
                <button style={child} onClick={() => hire(signer, 1, HeroType.Archer)}>
                    {hero1 ? <img width="90px" src="./src/assets/game/heroes/Ranger.jpg" alt="Hero 1" />
                        : <img width="90px" src="./src/assets/game/heroes/plus.png" alt="Hero 1" />
                    }
                    {hero1 && `exp : ${hero1['exp']}`}
                </button>
                <button style={child} onClick={() => hire(signer, 2, HeroType.Mage)}>
                    {hero2 ? <img width="90px" src="./src/assets/game/heroes/Shaman.jpg" alt="Hero 2" />
                        : <img width="90px" src="./src/assets/game/heroes/plus.png" alt="Hero 2" />
                    }
                    {hero2 && `exp : ${hero2['exp']}`}
                </button>
                <button style={child} onClick={() => hire(signer, 3, HeroType.Druid)}>
                    {hero3 ? <img width="90px" src="./src/assets/game/heroes/Druid.jpg" alt="Hero 3" />
                        : <img width="90px" src="./src/assets/game/heroes/plus.png" alt="Hero 3" />
                    }
                    {hero3 && `exp : ${hero3['exp']}`}
                </button>
            </div>
            {false && heroesStore}
        </>
    );
}

export default Heroes;
