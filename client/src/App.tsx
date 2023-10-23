import { useDojo } from './DojoContext';
import { Direction, } from './dojo/createSystemCalls'
import { useComponentValue } from "@latticexyz/react";
import { Entity } from '@latticexyz/recs';
import { useEffect, useState } from 'react';
import { setComponentsFromGraphQLEntities } from '@dojoengine/utils';
import { DungeonType, HeroType } from './dojo/types';

import Map from "./components/Map";
import Menu from "./components/Menu";
import { DungeonInfo } from "./components/Dungeon";
import { BastionInfo } from "./components/Bastion";
import Heroes from './components/Heroes';

function App() {
  const {
    setup: {
      systemCalls: { create_player, hire_hero, enter_dungeon, next_room, leave_dungeon },
      components,
      network: { graphSdk, contractComponents }
    },
    account: { create, list, select, account, isDeploying }
  } = useDojo();

  // extract query
  const { getEntities } = graphSdk()

  // entity id - this example uses the account address as the entity id
  const entityId = account.address.toString();

  // get current component values
  const player = useComponentValue(components.Player, entityId as Entity);
  const dungeon = useComponentValue(components.CurrentDungeon, entityId as Entity);
  const hero1 = useComponentValue(components.Hero1, entityId as Entity);
  const hero2 = useComponentValue(components.Hero2, entityId as Entity);
  const hero3 = useComponentValue(components.Hero3, entityId as Entity);

  console.log("player", player);
  console.log("dungeon", dungeon);
  console.log("hero1", hero1);
  console.log("hero2", hero2);
  console.log("hero3", hero3);

  // use graphql to current state data
  useEffect(() => {
    if (!entityId) return;

    const fetchData = async () => {
      try {
        const { data } = await getEntities();
        if (data && data.entities) {
          setComponentsFromGraphQLEntities(contractComponents, data.entities.edges);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [entityId, contractComponents]);

  const mapImageUrl = "./src/assets/game/map.jpg";
  const [selectedBlock, setSelectedBlock] = useState<BastionInfo | DungeonInfo | null>(null);

  const appStyles: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const handleBlockClick = (info: BastionInfo | DungeonInfo) => {
    setSelectedBlock(info);
  };

  const actions = (
    <><button onClick={create}>{isDeploying ? "deploying burner" : "create burner"}</button>
      <div className="card">
        select signer:{" "}
        <select onChange={e => select(e.target.value)}>
          {list().map((account, index) => {
            return <option value={account.address} key={index}>{account.address}</option>
          })}i
        </select>
      </div>
      <div className="card">
        {!player && <button onClick={() => create_player(account)}>Create player</button>}
        <div>Player expirience: {player ? `${player['exp']}` : 'Need to create_player'}</div>
        <div>Player gold: {player ? `${player['gold']}` : 'Need to create_player'}</div>
        <Heroes hero1={hero1} hero2={hero2} hero3={hero3} signer={account} hire={hire_hero} />
        {/* <div>Player hero1: {player ? (hero1 ? `${hero1['hero_type']} ${hero1['exp']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <div>Player hero2: {player ? (hero2 ? `${hero2['hero_type']} ${hero2['exp']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <div>Player hero3: {player ? (hero3 ? `${hero3['hero_type']} ${hero3['exp']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <button onClick={() => hire_hero(account, 1, HeroType.Archer)}>Hire hero</button> */}

        <div >Current dungeon: {dungeon ? (dungeon.dungeon_type != 0 ? `type: ${dungeon['dungeon_type']}, room: ${dungeon['current_room']}` : 'No dungeon') : 'No dungeon'}</div>
      </div>
    </>
  )

  const dungeonActions = (<><button onClick={() => enter_dungeon(account, DungeonType.BlackTower, 100)}>Enter dungeon</button>
    {(<div>
      <button onClick={() => next_room(account)}>Next room</button>
      <button onClick={() => leave_dungeon(account)}>Leave</button>
      {dungeon && dungeon.dungeon_type != 0 && <div >dungeon: {dungeon ? (dungeon.dungeon_type != 0 ? `type: ${dungeon['dungeon_type']}, room: ${dungeon['current_room']}` : 'No dungeon') : 'No dungeon'}</div>
      }    </div>)}</>)

  return (
    <>
      <div className="container" style={appStyles}>
        <Map imageUrl={mapImageUrl} onBlockClick={handleBlockClick} />
        <Menu selectedBlock={selectedBlock} inner={actions} dungeonAction={dungeonActions} />
      </div>
    </>
  );
}

export default App;
