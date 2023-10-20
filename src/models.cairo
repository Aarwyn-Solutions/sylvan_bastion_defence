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
    exp: u32,
    gold: u32,
    in_dungeon: bool,
    pos_1: Hero,
    pos_2: Hero,
    pos_3: Hero,
    pos_4: Hero,
    pos_5: Hero,
}

fn shaman_multiplier(self: @Player) -> u32 {
    let has_shaman = 
        is_shaman(self.pos_1.hero_type) || 
        is_shaman(self.pos_2.hero_type) || 
        is_shaman(self.pos_3.hero_type) || 
        is_shaman(self.pos_4.hero_type) || 
        is_shaman(self.pos_5.hero_type);
    
    if has_shaman {2} else {1}
}

fn guardian_multiplier(self: @Player) -> u32 {
    let has_guardian = 
        is_guardian(self.pos_1.hero_type) || 
        is_guardian(self.pos_2.hero_type) || 
        is_guardian(self.pos_3.hero_type) || 
        is_guardian(self.pos_4.hero_type) || 
        is_guardian(self.pos_5.hero_type);
    
    if has_guardian {2} else {1}
}

trait PlayerTrait {
    fn calculate_squad_force(self: @Player) -> u32;
    fn calculate_squad_defence(self: @Player) -> u32;
}

impl PlayerTraitImpl of PlayerTrait {
    fn calculate_squad_force(self: @Player) -> u32 {
        let heroes_force = 
            self.pos_1.calculate_hero_force() +
            self.pos_2.calculate_hero_force() +
            self.pos_3.calculate_hero_force() +
            self.pos_4.calculate_hero_force() +
            self.pos_5.calculate_hero_force();
        let exp = *self.exp;
        let player_multi = if exp < 100 {10} else if exp > 100 && exp < 200 {12} else {15};
        shaman_multiplier(self)*heroes_force*player_multi/10
    }

    fn calculate_squad_defence(self: @Player) -> u32 {
        let heroes_defence = 
            self.pos_1.calculate_hero_defence() +
            self.pos_2.calculate_hero_defence() +
            self.pos_3.calculate_hero_defence() +
            self.pos_4.calculate_hero_defence() +
            self.pos_5.calculate_hero_defence();
        let exp = *self.exp;
        let player_multi = if exp < 100 {10} else if exp > 100 && exp < 200 {12} else {15};
        guardian_multiplier(self)*heroes_defence*player_multi/10
    }
}

#[derive(Model, Copy, Drop, Serde)]
struct PlayerHeroes {
    #[key]
    id: ContractAddress,
    hero_2: Hero,
    hero_1: Hero,
    hero_3: Hero,
    hero_4: Hero,
    hero_5: Hero,
    hero_6: Hero,
    hero_7: Hero,
    hero_8: Hero,
    hero_9: Hero,
    hero_10: Hero,
}

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
    fn new(hero_type: HeroType) -> Hero;
    fn calculate_hero_force(self: @Hero) -> u32;
    fn calculate_hero_defence(self: @Hero) -> u32;
}

impl HeroImpl of HeroTrait {
    fn new(hero_type: HeroType) -> Hero {
        Hero {
            hero_type: hero_type,
            item_1: Artifact::None,
            item_2: Artifact::None,
            exp: 0,
        }
    }

    fn calculate_hero_force(self: @Hero) -> u32 {
        let base_attack = match self.hero_type {
            HeroType::None => 0,
            HeroType::Archer => 100,
            HeroType::Shaman => 100,
            HeroType::Mage => 150,
            HeroType::Knight => 80,
            HeroType::Druid => 100,
            HeroType::Vendigo => 150,
            HeroType::Guardian => 90,
        };

        let mutiplier = if *self.exp < 100 {1} else if *self.exp > 100 && *self.exp < 200 {2} else {3};
        base_attack*mutiplier
    }

    fn calculate_hero_defence(self: @Hero) -> u32 {
        let base_defence = match self.hero_type {
            HeroType::None => 0,
            HeroType::Archer => 50,
            HeroType::Shaman => 50,
            HeroType::Mage => 30,
            HeroType::Knight => 100,
            HeroType::Druid => 60,
            HeroType::Vendigo => 90,
            HeroType::Guardian => 90,
        };
                
        let mutiplier = if *self.exp < 100 {1} else if *self.exp > 100 && *self.exp < 200 {2} else {3};
        base_defence*mutiplier
    }
}

#[derive(Copy, Drop, Serde, Introspect)]
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

fn is_shaman(self: @HeroType) -> bool {
    match self {
        HeroType::None => false, 
        HeroType::Archer => false,
        HeroType::Shaman => true,
        HeroType::Mage => false,
        HeroType::Knight => false,
        HeroType::Druid => false,
        HeroType::Vendigo => false,
        HeroType::Guardian => false,
    }
}

fn is_guardian(self: @HeroType) -> bool {
    match self {
        HeroType::None => false, 
        HeroType::Archer => false,
        HeroType::Shaman => false,
        HeroType::Mage => false,
        HeroType::Knight => false,
        HeroType::Druid => false,
        HeroType::Vendigo => false,
        HeroType::Guardian => true,
    }
}

fn is_ranged(self: @HeroType) -> bool {
    match self {
        HeroType::None => false, 
        HeroType::Archer => true,
        HeroType::Shaman => true,
        HeroType::Mage => true,
        HeroType::Knight => false,
        HeroType::Druid => false,
        HeroType::Vendigo => false,
        HeroType::Guardian => false,
    }
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
    GoblinCamp,
    WitchTown,
    BlackTower,
}

// Fight functions:

#[derive(Copy, Drop, Serde)]
struct FightResult {
    minus_health: u32,
    plus_player_xp: u32,
    plus_heroes_xp: u32,
}

fn fight(squad_force: u32, squad_defence: u32, room_force: u32, room_defence: u32) -> FightResult {
    let count = if squad_force >= room_defence {1} else {
        (room_defence - squad_force)/squad_force + 1
    };
    FightResult {
        minus_health: 0,
        plus_player_xp: 0,
        plus_heroes_xp: 0,
    }
}


// #[derive(Serde, Copy, Drop, Introspect)]
// enum Direction {
//     None: (),
//     Left: (),
//     Right: (),
//     Up: (),
//     Down: (),
// }

// impl DirectionPrintImpl of PrintTrait<Direction> {
//     fn print(self: Direction) {
//         match self {
//             Direction::None(()) => 0.print(),
//             Direction::Left(()) => 1.print(),
//             Direction::Right(()) => 2.print(),
//             Direction::Up(()) => 3.print(),
//             Direction::Down(()) => 4.print(),
//         }
//     }
// }

// impl DirectionIntoFelt252 of Into<Direction, felt252> {
//     fn into(self: Direction) -> felt252 {
//         match self {
//             Direction::None(()) => 0,
//             Direction::Left(()) => 1,
//             Direction::Right(()) => 2,
//             Direction::Up(()) => 3,
//             Direction::Down(()) => 4,
//         }
//     }
// }

// #[derive(Model, Copy, Drop, Serde)]
// struct Moves {
//     #[key]
//     player: ContractAddress,
//     remaining: u8,
//     last_direction: Direction
// }

// #[derive(Copy, Drop, Serde, Print, Introspect)]
// struct Vec2 {
//     x: u32,
//     y: u32
// }

// #[derive(Model, Copy, Drop, Print, Serde)]
// struct Position {
//     #[key]
//     player: ContractAddress,
//     vec: Vec2,
// }

// trait Vec2Trait {
//     fn is_zero(self: Vec2) -> bool;
//     fn is_equal(self: Vec2, b: Vec2) -> bool;
// }

// impl Vec2Impl of Vec2Trait {
//     fn is_zero(self: Vec2) -> bool {
//         if self.x - self.y == 0 {
//             return true;
//         }
//         false
//     }

//     fn is_equal(self: Vec2, b: Vec2) -> bool {
//         self.x == b.x && self.y == b.y
//     }
// }

// #[cfg(test)]
// mod tests {
//     use debug::PrintTrait;
//     use super::{Position, Vec2, Vec2Trait};

//     #[test]
//     #[available_gas(100000)]
//     fn test_vec_is_zero() {
//         assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
//     }

//     #[test]
//     #[available_gas(100000)]
//     fn test_vec_is_equal() {
//         let position = Vec2 { x: 420, y: 0 };
//         assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
//     }
// }
