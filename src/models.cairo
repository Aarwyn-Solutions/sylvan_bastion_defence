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
    level: u32,
    pos_1: Option<Hero>,
    pos_2: Option<Hero>,
    pos_3: Option<Hero>,
    pos_4: Option<Hero>,
    pos_5: Option<Hero>,
}

#[derive(Model, Copy, Drop, Serde)]
struct Heroes {
    #[key]
    id: ContractAddress,
    hero_2: Option<Hero>,
    hero_1: Option<Hero>,
    hero_3: Option<Hero>,
    hero_4: Option<Hero>,
    hero_5: Option<Hero>,
    hero_6: Option<Hero>,
    hero_7: Option<Hero>,
    hero_8: Option<Hero>,
    hero_9: Option<Hero>,
    hero_10: Option<Hero>,
}

#[derive(Copy, Drop, Serde)]
struct Hero {
    hero_type: Hero,
    item_1: Option<Artifact>,
    item_2: Option<Artifact>,
}

impl HeroOptionSchemaIntrospectionTrait of SchemaIntrospection<Option<Hero>> {
    fn size() -> usize {
        1
    }

    fn layout(ref layout: Array<u8>) {
        layout.append(8);
    }

    fn ty() -> Ty {
        Ty::Enum(
            Enum {
                name: 'HeroOption',
                attrs: array![].span(),
                children: array![
                    ('Some', serialize_member_type(@Ty::Tuple(array![].span()))),
                    ('None', serialize_member_type(@Ty::Tuple(array![].span()))),
                    // ('Midfielder', serialize_member_type(@Ty::Tuple(array![].span()))),
                    // ('Attacker', serialize_member_type(@Ty::Tuple(array![].span()))),
                ]
                .span()
            }
        )
    }
}

#[derive(Copy, Drop, Serde, Introspect)]
enum HeroType {
    Archer,
    Knight,
    Druid,
    Vendigo,
    Shaman,
    Guardian,
}

#[derive(Copy, Drop, Serde, Introspect)]
enum Artifact {
    WoodenBow,
    ShordSword,
    WoodenShield,
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
