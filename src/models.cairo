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
    fn add_heroes_exp(ref self: Player, exp: u32);
    // fn reduce_heroes_exp(ref self: Player, exp: u32);
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

    fn add_heroes_exp(ref self: Player, exp: u32) {
        if is_some_hero(self.pos_1) {
            self.pos_1.exp += exp;
        }

        if is_some_hero(self.pos_2) {
            self.pos_2.exp += exp;
        }

        if is_some_hero(self.pos_3) {
            self.pos_3.exp += exp;
        }

        if is_some_hero(self.pos_4) {
            self.pos_4.exp += exp;
        }

        if is_some_hero(self.pos_5) {
            self.pos_5.exp += exp;
        }
    }
}

#[derive(Copy, Drop, Serde, Introspect)]
struct Hero {
    hero_type: HeroType,
    item_1: Artifact,
    item_2: Artifact,
    exp: u32,
}

fn is_some_hero(hero: Hero) -> bool {
    match hero.hero_type {
            HeroType::None => false,
            HeroType::Archer =>  true,
            HeroType::Shaman =>  true,
            HeroType::Mage =>  true,
            HeroType::Knight => true,
            HeroType::Druid =>  true,
            HeroType::Vendigo =>  true,
            HeroType::Guardian => true,
    }
}

trait HeroTrait {
    fn default() -> Hero;
    fn new(hero_type: HeroType) -> Hero;
    fn calculate_hero_force(self: @Hero) -> u32;
    fn calculate_hero_defence(self: @Hero) -> u32;
}

impl HeroImpl of HeroTrait {
    #[inline]
    fn default() -> Hero{
         Hero {
            hero_type: HeroType::None,
            item_1: Artifact::None,
            item_2: Artifact::None,
            exp: 0,
        }
    }

    #[inline]
    fn new(hero_type: HeroType) -> Hero {
        Hero {
            hero_type: hero_type,
            item_1: Artifact::None,
            item_2: Artifact::None,
            exp: 0,
        }
    }

    #[inline]
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

    #[inline]
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

#[inline]
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

#[inline]
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

#[inline]
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

mod dungeon {
    use array::ArrayTrait;
    use core::debug::PrintTrait;
    use starknet::ContractAddress;
    use dojo::database::schema::{
        Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
    };

    #[derive(Model, Copy, Drop, Serde)]
    struct CurrentDungeon {
        #[key]
        id: ContractAddress,
        dungeon_type: DungeonType,
        current_room: u8,
        squad_health: u32,
    }

    trait CurrentDungeonTrait {
        fn reset(ref self: CurrentDungeon);
    }

    impl CurrentDungeonTraitImpl of CurrentDungeonTrait {
        #[inline]
        fn reset(ref self: CurrentDungeon)  {
            self.dungeon_type = DungeonType::None;
            self.current_room = 0;
            self.squad_health = 0;
        }
    }

    #[derive(Copy, Drop, Serde, Introspect)]
    enum DungeonType {
        None,
        GoblinCamp,
        WitchTown,
        BlackTower,
    }

    trait DungeonTypeTrait {
        fn dungeon_room_count(self: DungeonType) -> u8;
        fn dungeon_force_interval(self: DungeonType) -> (u32, u32);
        fn dungeon_defence_interval(self: DungeonType) -> (u32, u32);
        fn gold_reward(self: @DungeonType) -> u32;
        fn is_some(self: DungeonType) -> bool;
    }

    impl DungeonTypeTraitImpl of DungeonTypeTrait {
        #[inline]
        fn dungeon_room_count(self: DungeonType) -> u8 {
            match self {
                DungeonType::None => 0,
                DungeonType::GoblinCamp => 2,
                DungeonType::WitchTown => 3,
                DungeonType::BlackTower => 5,
            }
        }

        #[inline]
        fn dungeon_force_interval(self: DungeonType) -> (u32, u32) {
            match self {
                DungeonType::None => (0, 0),
                DungeonType::GoblinCamp => (10, 20),
                DungeonType::WitchTown => (10, 15),
                DungeonType::BlackTower => (20, 25),
            }
        }

        #[inline]
        fn dungeon_defence_interval(self: DungeonType) -> (u32, u32) {
            match self {
                DungeonType::None => (0, 0),
                DungeonType::GoblinCamp => (0, 10),
                DungeonType::WitchTown => (15, 30),
                DungeonType::BlackTower => (20, 40),
            }
        }

        fn gold_reward(self: @DungeonType) -> u32 {
            match self {
                DungeonType::None => 0,
                DungeonType::GoblinCamp => 20,
                DungeonType::WitchTown => 40,
                DungeonType::BlackTower => 50,
            }
        }

        #[inline]
        fn is_some(self: DungeonType) -> bool {
            match self {
                DungeonType::None => false,
                DungeonType::GoblinCamp => true,
                DungeonType::WitchTown => true,
                DungeonType::BlackTower => true,
            }
        }
    }
}



mod fight {
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
        let minus_health = if squad_defence >= room_force {0} else {
            let diff = room_force - squad_defence;
            count*diff
        };

        let base_xp = 5;
        let base_force_xp = 1;
        let base_defence_xp = 1;

        let plus_defence_xp = base_defence_xp*(room_defence/squad_defence);
        let plus_force_xp = base_defence_xp*(room_force/squad_force);

        let plus_player_xp = plus_defence_xp + plus_force_xp;
        let plus_heroes_xp = plus_defence_xp + plus_force_xp + base_xp;

        FightResult {
            minus_health,
            plus_player_xp,
            plus_heroes_xp,
        }
    }
}
