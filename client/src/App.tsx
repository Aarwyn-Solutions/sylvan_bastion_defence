import { useDojo } from './DojoContext';
import { Direction, } from './dojo/createSystemCalls'
import { useComponentValue } from "@latticexyz/react";
import { Entity } from '@latticexyz/recs';
import { useEffect } from 'react';
import { setComponentsFromGraphQLEntities } from '@dojoengine/utils';
import { DungeonType, HeroType } from './dojo/types';

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

  console.log("player", player);
  console.log("dungeon", dungeon);

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


  return (
    <>
      <button onClick={create}>{isDeploying ? "deploying burner" : "create burner"}</button>
      <div className="card">
        select signer:{" "}
        <select onChange={e => select(e.target.value)}>
          {list().map((account, index) => {
            return <option value={account.address} key={index}>{account.address}</option>
          })}i
        </select>
      </div>
      <div className="card">
        <button onClick={() => create_player(account)}>Create player</button>
        <div>Player expirience: {player ? `${player['exp']}` : 'Need to create_player'}</div>
        <div>Player gold: {player ? `${player['gold']}` : 'Need to create_player'}</div>
        <div>Player hero1: {player ? (player.pos_1 ? `${player.pos_1['hero_type']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <div>Player hero2: {player ? (player.pos_2 ? `${player.pos_2['hero_type']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <div>Player hero3: {player ? (player.pos_3 ? `${player.pos_3['hero_type']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <div>Player hero4: {player ? (player.pos_4 ? `${player.pos_4['hero_type']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <div>Player hero5: {player ? (player.pos_5 ? `${player.pos_5['hero_type']}` : 'Need to hire hero') : 'Need to create_player'}</div>
        <button onClick={() => hire_hero(account, 1, HeroType.Archer)}>Hire hero</button>
        <button onClick={() => enter_dungeon(account, DungeonType.BlackTower, 100)}>Enter dungeon</button>
        {dungeon && (<div>
          <button onClick={() => next_room(account)}>Next room</button>
          <button onClick={() => leave_dungeon(account)}>Leave</button>

        </div>)}
        <div>Current dungeon: {dungeon ? `${dungeon['dungeon_type']}, ${dungeon['current_room']}` : 'Need to enter dungeon'}</div>
      </div>
      {/* <div className="card">
        <button onClick={() => move(account, Direction.Up)}>Move Up</button> <br />
        <button onClick={() => move(account, Direction.Left)}>Move Left</button>
        <button onClick={() => move(account, Direction.Right)}>Move Right</button> <br />
        <button onClick={() => move(account, Direction.Down)}>Move Down</button>
      </div> */}
    </>
  );
}

export default App;
