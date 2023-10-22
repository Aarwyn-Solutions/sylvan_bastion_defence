import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Enum: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u32: { input: any; output: any; }
};

export type CurrentDungeon = {
  __typename?: 'CurrentDungeon';
  current_room?: Maybe<Scalars['u8']['output']>;
  dungeon_type?: Maybe<Scalars['Enum']['output']>;
  entity?: Maybe<Entity>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
  squad_health?: Maybe<Scalars['u32']['output']>;
};

export type CurrentDungeonConnection = {
  __typename?: 'CurrentDungeonConnection';
  edges?: Maybe<Array<Maybe<CurrentDungeonEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type CurrentDungeonEdge = {
  __typename?: 'CurrentDungeonEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<CurrentDungeon>;
};

export type CurrentDungeonOrder = {
  direction: OrderDirection;
  field: CurrentDungeonOrderField;
};

export enum CurrentDungeonOrderField {
  CurrentRoom = 'CURRENT_ROOM',
  DungeonType = 'DUNGEON_TYPE',
  Id = 'ID',
  SquadHealth = 'SQUAD_HEALTH'
}

export type CurrentDungeonWhereInput = {
  current_room?: InputMaybe<Scalars['u8']['input']>;
  current_roomEQ?: InputMaybe<Scalars['u8']['input']>;
  current_roomGT?: InputMaybe<Scalars['u8']['input']>;
  current_roomGTE?: InputMaybe<Scalars['u8']['input']>;
  current_roomLT?: InputMaybe<Scalars['u8']['input']>;
  current_roomLTE?: InputMaybe<Scalars['u8']['input']>;
  current_roomNEQ?: InputMaybe<Scalars['u8']['input']>;
  dungeon_type?: InputMaybe<Scalars['Enum']['input']>;
  id?: InputMaybe<Scalars['ContractAddress']['input']>;
  idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  squad_health?: InputMaybe<Scalars['u32']['input']>;
  squad_healthEQ?: InputMaybe<Scalars['u32']['input']>;
  squad_healthGT?: InputMaybe<Scalars['u32']['input']>;
  squad_healthGTE?: InputMaybe<Scalars['u32']['input']>;
  squad_healthLT?: InputMaybe<Scalars['u32']['input']>;
  squad_healthLTE?: InputMaybe<Scalars['u32']['input']>;
  squad_healthNEQ?: InputMaybe<Scalars['u32']['input']>;
};

export type Entity = {
  __typename?: 'Entity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  model_names?: Maybe<Scalars['String']['output']>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  systemCall: SystemCall;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Event>;
};

export type Hero = {
  __typename?: 'Hero';
  exp?: Maybe<Scalars['u32']['output']>;
  hero_type?: Maybe<Scalars['Enum']['output']>;
  item_1?: Maybe<Scalars['Enum']['output']>;
  item_2?: Maybe<Scalars['Enum']['output']>;
};

export type Metadata = {
  __typename?: 'Metadata';
  id?: Maybe<Scalars['ID']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type MetadataConnection = {
  __typename?: 'MetadataConnection';
  edges?: Maybe<Array<Maybe<MetadataEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type MetadataEdge = {
  __typename?: 'MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Metadata>;
};

export type Model = {
  __typename?: 'Model';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type ModelConnection = {
  __typename?: 'ModelConnection';
  edges?: Maybe<Array<Maybe<ModelEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type ModelEdge = {
  __typename?: 'ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Model>;
};

export type ModelUnion = CurrentDungeon | Player;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Player = {
  __typename?: 'Player';
  entity?: Maybe<Entity>;
  exp?: Maybe<Scalars['u32']['output']>;
  gold?: Maybe<Scalars['u32']['output']>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
  pos_1?: Maybe<Hero>;
  pos_2?: Maybe<Hero>;
  pos_3?: Maybe<Hero>;
  pos_4?: Maybe<Hero>;
  pos_5?: Maybe<Hero>;
};

export type PlayerConnection = {
  __typename?: 'PlayerConnection';
  edges?: Maybe<Array<Maybe<PlayerEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Player>;
};

export type PlayerOrder = {
  direction: OrderDirection;
  field: PlayerOrderField;
};

export enum PlayerOrderField {
  Exp = 'EXP',
  Gold = 'GOLD',
  Id = 'ID',
  Pos_1 = 'POS_1',
  Pos_2 = 'POS_2',
  Pos_3 = 'POS_3',
  Pos_4 = 'POS_4',
  Pos_5 = 'POS_5'
}

export type PlayerWhereInput = {
  exp?: InputMaybe<Scalars['u32']['input']>;
  expEQ?: InputMaybe<Scalars['u32']['input']>;
  expGT?: InputMaybe<Scalars['u32']['input']>;
  expGTE?: InputMaybe<Scalars['u32']['input']>;
  expLT?: InputMaybe<Scalars['u32']['input']>;
  expLTE?: InputMaybe<Scalars['u32']['input']>;
  expNEQ?: InputMaybe<Scalars['u32']['input']>;
  gold?: InputMaybe<Scalars['u32']['input']>;
  goldEQ?: InputMaybe<Scalars['u32']['input']>;
  goldGT?: InputMaybe<Scalars['u32']['input']>;
  goldGTE?: InputMaybe<Scalars['u32']['input']>;
  goldLT?: InputMaybe<Scalars['u32']['input']>;
  goldLTE?: InputMaybe<Scalars['u32']['input']>;
  goldNEQ?: InputMaybe<Scalars['u32']['input']>;
  id?: InputMaybe<Scalars['ContractAddress']['input']>;
  idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Query = {
  __typename?: 'Query';
  currentdungeonModels?: Maybe<CurrentDungeonConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  events?: Maybe<EventConnection>;
  metadata: Metadata;
  metadatas?: Maybe<MetadataConnection>;
  model: Model;
  models?: Maybe<ModelConnection>;
  playerModels?: Maybe<PlayerConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
};


export type QueryCurrentdungeonModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CurrentDungeonOrder>;
  where?: InputMaybe<CurrentDungeonWhereInput>;
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMetadataArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPlayerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySystemsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  entityUpdated: Entity;
  modelRegistered: Model;
};


export type SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type System = {
  __typename?: 'System';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  system_id?: Maybe<Scalars['ID']['output']>;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<System>;
};

export type GetEntitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'CurrentDungeon', dungeon_type?: any | null, current_room?: any | null, squad_health?: any | null } | { __typename: 'Player', exp?: any | null, gold?: any | null, pos_1?: { __typename?: 'Hero', hero_type?: any | null, item_1?: any | null, item_2?: any | null, exp?: any | null } | null, pos_2?: { __typename?: 'Hero', hero_type?: any | null, item_1?: any | null, item_2?: any | null, exp?: any | null } | null, pos_3?: { __typename?: 'Hero', hero_type?: any | null, item_1?: any | null, item_2?: any | null, exp?: any | null } | null, pos_4?: { __typename?: 'Hero', hero_type?: any | null, item_1?: any | null, item_2?: any | null, exp?: any | null } | null, pos_5?: { __typename?: 'Hero', hero_type?: any | null, item_1?: any | null, item_2?: any | null, exp?: any | null } | null } | null> | null } | null } | null> | null } | null };


export const GetEntitiesDocument = gql`
    query getEntities {
  entities(keys: ["%"]) {
    edges {
      node {
        keys
        models {
          __typename
          ... on Player {
            exp
            gold
            pos_1 {
              hero_type
              item_1
              item_2
              exp
            }
            pos_2 {
              hero_type
              item_1
              item_2
              exp
            }
            pos_3 {
              hero_type
              item_1
              item_2
              exp
            }
            pos_4 {
              hero_type
              item_1
              item_2
              exp
            }
            pos_5 {
              hero_type
              item_1
              item_2
              exp
            }
          }
          ... on CurrentDungeon {
            dungeon_type
            current_room
            squad_health
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetEntitiesDocumentString = print(GetEntitiesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getEntities(variables?: GetEntitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetEntitiesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetEntitiesQuery>(GetEntitiesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEntities', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;