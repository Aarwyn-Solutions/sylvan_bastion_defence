import { useDojo } from './DojoContext';
import { Direction, } from './dojo/createSystemCalls'
import { useComponentValue } from "@latticexyz/react";
import { Entity } from '@latticexyz/recs';
import { useEffect } from 'react';
import { setComponentsFromGraphQLEntities } from '@dojoengine/utils';

function App() {
  const {
    setup: {
      systemCalls: { create_player },
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
        <div>Is player in dungeon?: {player ? `${player['in_dungeon']}` : 'Need to create_player'}</div>
        {/* <div>Position: {position ? `${position.vec['x']}, ${position.vec['y']}` : 'Need to '}</div> */}
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
