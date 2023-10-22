use array::ArrayTrait;
use core::debug::PrintTrait;
use starknet::ContractAddress;
use dojo::database::schema::{
    Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
};

#[derive(Model, Copy, Drop, Serde, Print)]
struct Player {
    #[key]
    id: ContractAddress,
    exp: u32,
    gold: u32,
}

mod heroes {
    use array::ArrayTrait;
    use core::debug::PrintTrait;
    use starknet::ContractAddress;
    use dojo::database::schema::{
        Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
    };


    // Slot 1 Hero
    #[derive(Model, Copy, Drop, Serde, Print)]
    struct Hero1 {
        #[key]
        id: ContractAddress,
        hero_type: HeroType,
        exp: u32,
    }

    // Slot 2 Hero
    #[derive(Model, Copy, Drop, Serde, Print)]
    struct Hero2 {
        #[key]
        id: ContractAddress,
        hero_type: HeroType,
        exp: u32,
    }

    // Slot 3 Hero
    #[derive(Model, Copy, Drop, Serde, Print)]
    struct Hero3 {
        #[key]
        id: ContractAddress,
        hero_type: HeroType,
        exp: u32,
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

    trait HeroTypeTrait {
        fn calculate_hero_force(self: HeroType, exp: u32) -> u32;
        fn calculate_hero_defence(self: HeroType, exp: u32) -> u32;
        fn is_some(self: HeroType) -> bool;
    }

    impl HeroImpl of HeroTypeTrait {
        #[inline]
        fn calculate_hero_force(self: HeroType, exp: u32) -> u32 {
            let base_attack = match self {
                HeroType::None => 0,
                HeroType::Archer => 100,
                HeroType::Shaman => 100,
                HeroType::Mage => 150,
                HeroType::Knight => 80,
                HeroType::Druid => 100,
                HeroType::Vendigo => 150,
                HeroType::Guardian => 90,
            };

            let mutiplier = if exp < 100 {1} else if exp > 100 && exp < 200 {2} else {3};
            base_attack*mutiplier
        }

        #[inline]
        fn calculate_hero_defence(self: HeroType, exp: u32) -> u32 {
            let base_defence = match self {
                HeroType::None => 0,
                HeroType::Archer => 50,
                HeroType::Shaman => 50,
                HeroType::Mage => 30,
                HeroType::Knight => 100,
                HeroType::Druid => 60,
                HeroType::Vendigo => 90,
                HeroType::Guardian => 90,
            };
                    
            let mutiplier = if exp < 100 {1} else if exp > 100 && exp < 200 {2} else {3};
            base_defence*mutiplier
        }

        fn is_some(self: HeroType) -> bool {
            match self {
                HeroType::None => false,
                HeroType::Archer => true,
                HeroType::Shaman => true,
                HeroType::Mage => true,
                HeroType::Knight => true,
                HeroType::Druid => true,
                HeroType::Vendigo => true,
                HeroType::Guardian => true,
            }
        }
    }

    impl HeroTypePrint of PrintTrait<HeroType> {
        fn print(self: HeroType) {
            match self {
                HeroType::None => 'None'.print(),
                HeroType::Archer => 'Archer'.print(),
                HeroType::Shaman => 'Shaman'.print(),
                HeroType::Mage => 'Mage'.print(),
                HeroType::Knight =>  'Knight'.print(),
                HeroType::Druid => 'Druid'.print(),
                HeroType::Vendigo => 'Vendigo'.print(),
                HeroType::Guardian => 'Guardian'.print(),
            }
        }
    }
}

mod dungeon {
    use array::ArrayTrait;
    use core::debug::PrintTrait;
    use starknet::ContractAddress;
    use dojo::database::schema::{
        Enum, Member, Ty, Struct, SchemaIntrospection, serialize_member, serialize_member_type
    };

    #[derive(Model, Copy, Drop, Serde, Print)]
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

    #[derive(Copy, Drop, Serde, Introspect, PartialEq)]
    enum DungeonType {
        None,
        GoblinCamp,
        WitchTown,
        BlackTower,
    }

    impl DungeonTypePrint of PrintTrait<DungeonType> {
    fn print(self: DungeonType) {
        match self {
                DungeonType::None => 'None'.print(),
                DungeonType::GoblinCamp => 'GoblinCamp'.print(),
                DungeonType::WitchTown => 'WitchTown'.print(),
                DungeonType::BlackTower => 'BlackTower'.print(),
            }
        }
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
                DungeonType::BlackTower => (10, 40),
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
