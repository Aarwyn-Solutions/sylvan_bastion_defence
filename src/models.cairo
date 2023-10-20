use array::ArrayTrait;
use core::debug::PrintTrait;
use starknet::ContractAddress;
use dojo::database::schema::{
    Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
};

#[derive(Model, Copy, Drop, Serde)]
struct Player {
    #[key]
    id: ContractAddress,
    experience: u32,
    gold: u32,
    in_dungeon: bool,
    pos_1: Hero,
    pos_2: Hero,
    pos_3: Hero,
    pos_4: Hero,
    pos_5: Hero,
}

// #[derive(Model, Copy, Drop, Serde)]
// struct PlayerHeroes {
//     #[key]
//     id: ContractAddress,
//     hero_2: Hero,
//     hero_1: Hero,
//     hero_3: Hero,
//     hero_4: Hero,
//     hero_5: Hero,
//     hero_6: Hero,
//     hero_7: Hero,
//     hero_8: Hero,
//     hero_9: Hero,
//     hero_10: Hero,
// }

#[derive(Model, Copy, Drop, Serde)]
struct CurrentDungeon {
    #[key]
    id: ContractAddress,
    dungeon_type: DungeonType,
    current_room: u8,
    squad_health: u32,
}

#[derive(Copy, Drop, Serde, Introspect)]
struct Hero {
    hero_type: HeroType,
    item_1: Artifact,
    item_2: Artifact,
    exp: u32,
}

trait HeroTrait {
    fn default() -> Hero;
    fn new(hero_type: HeroType) -> Hero;
    fn calculate_hero_force(self: @Hero) -> u32;
    fn calculate_hero_defence(self: @Hero) -> u32;
}

impl HeroImpl of HeroTrait {
    fn default() -> Hero{
         Hero {
            hero_type: HeroType::None,
            item_1: Artifact::None,
            item_2: Artifact::None,
            exp: 0,
        }
    }

    fn new(hero_type: HeroType) -> Hero {
        Hero {
            hero_type: hero_type,
            item_1: Artifact::None,
            item_2: Artifact::None,
            exp: 0,
        }
    }

    fn calculate_hero_force(self: @Hero) -> u32 {
        match self.hero_type {
            HeroType::None => 0,
            HeroType::Archer => 100,
            HeroType::Shaman => 100,
            HeroType::Mage => 150,
            HeroType::Knight => 80,
            HeroType::Druid => 100,
            HeroType::Vendigo => 150,
            HeroType::Guardian => 90,
        }
    }

    fn calculate_hero_defence(self: @Hero) -> u32 {
        match self.hero_type {
            HeroType::None => 0,
            HeroType::Archer => 50,
            HeroType::Shaman => 50,
            HeroType::Mage => 30,
            HeroType::Knight => 100,
            HeroType::Druid => 60,
            HeroType::Vendigo => 90,
            HeroType::Guardian => 90,
        }
    }
}

#[derive(Copy, Drop, Serde, Introspect, PartialEq)]
enum HeroType {
    // None
    None,

    // Range attack:
    Archer,
    Shaman,
    Mage,

    // Melee atack
    Knight,
    Druid,
    Vendigo,
    Guardian,
}

#[derive(Copy, Drop, Serde, Introspect)]
enum Artifact {
    None,
    WoodenBow,
    ShordSword,
    WoodenShield,
}

#[derive(Copy, Drop, Serde, Introspect)]
enum DungeonType {
    None,
    GoblinDen,
    WitchTown,
    LoneTower,
}