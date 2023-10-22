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

export type Hero1 = {
  __typename?: 'Hero1';
  entity?: Maybe<Entity>;
  exp?: Maybe<Scalars['u32']['output']>;
  hero_type?: Maybe<Scalars['Enum']['output']>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Hero1Connection = {
  __typename?: 'Hero1Connection';
  edges?: Maybe<Array<Maybe<Hero1Edge>>>;
  total_count: Scalars['Int']['output'];
};

export type Hero1Edge = {
  __typename?: 'Hero1Edge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Hero1>;
};

export type Hero1Order = {
  direction: OrderDirection;
  field: Hero1OrderField;
};

export enum Hero1OrderField {
  Exp = 'EXP',
  HeroType = 'HERO_TYPE',
  Id = 'ID'
}

export type Hero1WhereInput = {
  exp?: InputMaybe<Scalars['u32']['input']>;
  expEQ?: InputMaybe<Scalars['u32']['input']>;
  expGT?: InputMaybe<Scalars['u32']['input']>;
  expGTE?: InputMaybe<Scalars['u32']['input']>;
  expLT?: InputMaybe<Scalars['u32']['input']>;
  expLTE?: InputMaybe<Scalars['u32']['input']>;
  expNEQ?: InputMaybe<Scalars['u32']['input']>;
  hero_type?: InputMaybe<Scalars['Enum']['input']>;
  id?: InputMaybe<Scalars['ContractAddress']['input']>;
  idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Hero2 = {
  __typename?: 'Hero2';
  entity?: Maybe<Entity>;
  exp?: Maybe<Scalars['u32']['output']>;
  hero_type?: Maybe<Scalars['Enum']['output']>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Hero2Connection = {
  __typename?: 'Hero2Connection';
  edges?: Maybe<Array<Maybe<Hero2Edge>>>;
  total_count: Scalars['Int']['output'];
};

export type Hero2Edge = {
  __typename?: 'Hero2Edge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Hero2>;
};

export type Hero2Order = {
  direction: OrderDirection;
  field: Hero2OrderField;
};

export enum Hero2OrderField {
  Exp = 'EXP',
  HeroType = 'HERO_TYPE',
  Id = 'ID'
}

export type Hero2WhereInput = {
  exp?: InputMaybe<Scalars['u32']['input']>;
  expEQ?: InputMaybe<Scalars['u32']['input']>;
  expGT?: InputMaybe<Scalars['u32']['input']>;
  expGTE?: InputMaybe<Scalars['u32']['input']>;
  expLT?: InputMaybe<Scalars['u32']['input']>;
  expLTE?: InputMaybe<Scalars['u32']['input']>;
  expNEQ?: InputMaybe<Scalars['u32']['input']>;
  hero_type?: InputMaybe<Scalars['Enum']['input']>;
  id?: InputMaybe<Scalars['ContractAddress']['input']>;
  idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Hero3 = {
  __typename?: 'Hero3';
  entity?: Maybe<Entity>;
  exp?: Maybe<Scalars['u32']['output']>;
  hero_type?: Maybe<Scalars['Enum']['output']>;
  id?: Maybe<Scalars['ContractAddress']['output']>;
};

export type Hero3Connection = {
  __typename?: 'Hero3Connection';
  edges?: Maybe<Array<Maybe<Hero3Edge>>>;
  total_count: Scalars['Int']['output'];
};

export type Hero3Edge = {
  __typename?: 'Hero3Edge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Hero3>;
};

export type Hero3Order = {
  direction: OrderDirection;
  field: Hero3OrderField;
};

export enum Hero3OrderField {
  Exp = 'EXP',
  HeroType = 'HERO_TYPE',
  Id = 'ID'
}

export type Hero3WhereInput = {
  exp?: InputMaybe<Scalars['u32']['input']>;
  expEQ?: InputMaybe<Scalars['u32']['input']>;
  expGT?: InputMaybe<Scalars['u32']['input']>;
  expGTE?: InputMaybe<Scalars['u32']['input']>;
  expLT?: InputMaybe<Scalars['u32']['input']>;
  expLTE?: InputMaybe<Scalars['u32']['input']>;
  expNEQ?: InputMaybe<Scalars['u32']['input']>;
  hero_type?: InputMaybe<Scalars['Enum']['input']>;
  id?: InputMaybe<Scalars['ContractAddress']['input']>;
  idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
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

export type ModelUnion = CurrentDungeon | Hero1 | Hero2 | Hero3 | Player;

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
  Id = 'ID'
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
  hero1Models?: Maybe<Hero1Connection>;
  hero2Models?: Maybe<Hero2Connection>;
  hero3Models?: Maybe<Hero3Connection>;
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


export type QueryHero1ModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Hero1Order>;
  where?: InputMaybe<Hero1WhereInput>;
};


export type QueryHero2ModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Hero2Order>;
  where?: InputMaybe<Hero2WhereInput>;
};


export type QueryHero3ModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Hero3Order>;
  where?: InputMaybe<Hero3WhereInput>;
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


export type GetEntitiesQuery = { __typename?: 'Query', entities?: { __typename?: 'EntityConnection', edges?: Array<{ __typename?: 'EntityEdge', node?: { __typename?: 'Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'CurrentDungeon', dungeon_type?: any | null, current_room?: any | null, squad_health?: any | null } | { __typename: 'Hero1', hero_type?: any | null, exp?: any | null } | { __typename: 'Hero2', hero_type?: any | null, exp?: any | null } | { __typename: 'Hero3', hero_type?: any | null, exp?: any | null } | { __typename: 'Player', exp?: any | null, gold?: any | null } | null> | null } | null } | null> | null } | null };


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
          }
          ... on CurrentDungeon {
            dungeon_type
            current_room
            squad_health
          }
          ... on Hero1 {
            hero_type
            exp
          }
          ... on Hero2 {
            hero_type
            exp
          }
          ... on Hero3 {
            hero_type
            exp
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