use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use starknet::{ContractAddress, ClassHash};

use sylvan_bastion_defence::models::{Player, heroes::HeroType, dungeon::{DungeonType, CurrentDungeon}, };

// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn create_player(self: @TContractState);
    fn hire_hero(self: @TContractState, position: u8, hero: HeroType);
    fn enter_dungeon(self: @TContractState, dungeon_type: DungeonType, gold: u32);
    fn next_room(self: @TContractState);
    fn leave_dungeon(self: @TContractState);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use core::traits::Into;
    use starknet::{ContractAddress, get_caller_address};
    use super::IActions;

    use sylvan_bastion_defence::models::{Player, heroes::{Hero1, Hero2, Hero3, HeroType, HeroTypeTrait}, dungeon::{DungeonType, DungeonTypeTrait, CurrentDungeon, CurrentDungeonTrait}, fight::fight};

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PlayerCreated: PlayerCreated,
        PlayerHiredHero:PlayerHiredHero,
        DungeonEntered: DungeonEntered,
        DungeonNextRoom: DungeonNextRoom,
        DungeonLeft: DungeonLeft,
        Hero1Hired: Hero1Hired,
        Hero2Hired: Hero2Hired,
        Hero3Hired: Hero3Hired,
        Hero1ExpIncreased: Hero1ExpIncreased,
        Hero2ExpIncreased: Hero2ExpIncreased,
        Hero3ExpIncreased: Hero3ExpIncreased
    }

    #[derive(Drop, starknet::Event)]
    struct PlayerCreated {
        player: Player
    }

    #[derive(Drop, starknet::Event)]
    struct PlayerHiredHero {
        player: Player
    }

    #[derive(Drop, starknet::Event)]
    struct DungeonEntered {
        player: Player,
        current_dungeon: CurrentDungeon
    }

     #[derive(Drop, starknet::Event)]
    struct DungeonNextRoom {
        player: Player,
        current_dungeon: CurrentDungeon
    }

    #[derive(Drop, starknet::Event)]
    struct DungeonLeft {
        current_dungeon: CurrentDungeon
    }

    #[derive(Drop, starknet::Event)]
    struct Hero1Hired {
        hero_1: Hero1,
        player: Player,
    }

    #[derive(Drop, starknet::Event)]
    struct Hero2Hired {
        hero_2: Hero2,
        player: Player,
    }

    #[derive(Drop, starknet::Event)]
    struct Hero3Hired {
        hero_3: Hero3,
        player: Player,
    }

    #[derive(Drop, starknet::Event)]
    struct Hero1ExpIncreased {
        hero_1: Hero1,
        player: Player,
    }

    #[derive(Drop, starknet::Event)]
    struct Hero2ExpIncreased {
        hero_2: Hero2,
        player: Player,
    }

    #[derive(Drop, starknet::Event)]
    struct Hero3ExpIncreased {
        hero_3: Hero3,
        player: Player,
    }

    // impl: implement functions specified in trait
    #[external(v0)]
    impl ActionImpl of IActions<ContractState> {
        fn create_player(self: @ContractState,) {
            let world = self.world_dispatcher.read();
            // Get the address of the current caller, possibly the player's address.
            let player_address = get_caller_address();

            let player = Player {
                id: player_address,
                exp: 0_u32,
                gold: 10000_u32,
            };
            set!(world, (player));
            emit!(world, PlayerCreated{player});
        }

        fn hire_hero(self: @ContractState, position: u8, hero: HeroType) {
            let world = self.world_dispatcher.read();
            // Get the address of the current caller, possibly the player's address.
            let id = get_caller_address();

            let mut player = get!(world, (id), (Player));
            add_hero_on_pos(world, ref player, position, hero);
            set!(world, (player));
            emit!(world, PlayerHiredHero {player});
        }

        fn enter_dungeon(self: @ContractState, dungeon_type: DungeonType, gold: u32) {
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let id = get_caller_address();
            let mut current_dungeon = get!(world, (id), (CurrentDungeon));

            assert(dungeon_type.is_some(), 'wrong dungeon');

            let mut player = get!(world, (id), (Player));
            assert(player.gold >= gold, 'not enough gold');
            player.gold -= gold;
   
            current_dungeon.squad_health = gold*100;
            current_dungeon.current_room = 1;

            assert(!current_dungeon.dungeon_type.is_some(), 'another dungeon is in progress');
            current_dungeon.dungeon_type = dungeon_type;

            do_fight(ref player, ref current_dungeon, world);

            set!(world, (player));
            set!(world, (current_dungeon));
            emit!(world, DungeonEntered {player, current_dungeon})
        }

        fn next_room(self: @ContractState) {
            let id = get_caller_address();
            let world = self.world_dispatcher.read();

            let mut player = get!(world, (id), (Player));
            let mut current_dungeon = get!(world, (id), (CurrentDungeon));

            assert(current_dungeon.dungeon_type.is_some(), 'dungeon is not in progress');
            assert(current_dungeon.current_room >= 1, 'dungeon is not in progress');
            current_dungeon.current_room += 1;

            do_fight(ref player, ref current_dungeon, world);

            if current_dungeon.current_room >= current_dungeon.dungeon_type.dungeon_room_count() {
                // give all rewards
                let gold_reward = current_dungeon.dungeon_type.gold_reward();
                player.gold += gold_reward;
                // leave dungeon
                current_dungeon.reset();
            }

            set!(world, (player));
            set!(world, (current_dungeon));
            emit!(world, DungeonNextRoom {player, current_dungeon})
        }

        fn leave_dungeon(self: @ContractState) {
            let world = self.world_dispatcher.read();
            let id = get_caller_address();
            let mut current_dungeon = get!(world, (id), (CurrentDungeon));
            assert(current_dungeon.dungeon_type.is_some(), 'dungeon is not in progress');
            current_dungeon.reset();
            set!(world, (current_dungeon));
            emit!(world, DungeonLeft {current_dungeon})
        }
    }

    // helper functions
    fn add_hero_on_pos(world: IWorldDispatcher, ref player: Player, position: u8, hero: HeroType) {
        assert(player.gold >=10, 'not enough gold');
        assert(position < 4 && position >0, 'position wrong');
        player.gold -= 10;
        if position == 1 {
            let hero_1 = Hero1 {id: player.id, hero_type: hero, exp: 0};
            emit!(world, Hero1Hired {hero_1, player});
            set!(world, (hero_1));
        } else if position == 2 {
            let hero_2 = Hero2 {id: player.id, hero_type: hero, exp: 0};
            emit!(world, Hero2Hired {hero_2, player});
            set!(world, (hero_2));
        } else {
            let hero_3 = Hero3 {id: player.id, hero_type: hero, exp: 0};
            emit!(world, Hero3Hired {hero_3, player});
            set!(world, (hero_3));
        }
    }

    fn do_fight(ref player: Player, ref current_dungeon: CurrentDungeon, world: IWorldDispatcher) {
        let dungeon_type = current_dungeon.dungeon_type;

        // TODO! Remake to random from the interval
        let (dungeon_force, _) = dungeon_type.dungeon_force_interval();
        let (dungeon_def, _) = dungeon_type.dungeon_defence_interval();

        let fight_result = fight(calculate_party_force(world, player), calculate_party_defence(world, player), dungeon_force, dungeon_def);

        if fight_result.minus_health >= current_dungeon.squad_health {
            let new_player_exp = match integer::u32_checked_sub(player.exp, fight_result.plus_player_xp) {
                Option::Some(a) => a,
                Option::None => 0,
            };

            player.exp /= 2;
            current_dungeon.reset();
        } else {
            player.exp += fight_result.plus_player_xp;
            add_heroes_exp(world, player, fight_result.plus_heroes_xp);
        }
    }

    fn calculate_party_force(world: IWorldDispatcher, player: Player) -> u32 {
        let hero_1 = get!(world, (player.id), (Hero1));
        let hero_2 = get!(world, (player.id), (Hero2));
        let hero_3 = get!(world, (player.id), (Hero3));
        let has_shaman = hero_1.hero_type == HeroType::Shaman || 
                         hero_2.hero_type == HeroType::Shaman || 
                         hero_3.hero_type == HeroType::Shaman;
        let shaman_multiplier = if has_shaman {2} else {1};

        let heroes_force = hero_1.hero_type.calculate_hero_force(hero_1.exp) +
                           hero_2.hero_type.calculate_hero_force(hero_2.exp) +
                           hero_3.hero_type.calculate_hero_force(hero_3.exp);

        let exp = player.exp;
        let player_multi = if exp < 100 {10} else if exp > 100 && exp < 200 {12} else {15};
        shaman_multiplier*heroes_force*player_multi/10
    }

    fn calculate_party_defence(world: IWorldDispatcher, player: Player) -> u32 {
        let hero_1 = get!(world, (player.id), (Hero1));
        let hero_2 = get!(world, (player.id), (Hero2));
        let hero_3 = get!(world, (player.id), (Hero3));
        let has_guardian = hero_1.hero_type == HeroType::Guardian || 
                           hero_2.hero_type == HeroType::Guardian || 
                           hero_3.hero_type == HeroType::Guardian;

        let guardian_multiplier = if has_guardian {2} else {1};

        let heroes_defence = hero_1.hero_type.calculate_hero_defence(hero_1.exp) +
                    hero_2.hero_type.calculate_hero_defence(hero_2.exp) +
                    hero_3.hero_type.calculate_hero_defence(hero_3.exp);

        let exp = player.exp;
        let player_multi = if exp < 100 {10} else if exp > 100 && exp < 200 {12} else {15};
        guardian_multiplier *heroes_defence*player_multi/10
    }

    fn add_heroes_exp(world: IWorldDispatcher, player: Player, plus_exp: u32) {
        let mut hero_1 = get!(world, (player.id), (Hero1));
        let mut hero_2 = get!(world, (player.id), (Hero2));
        let mut hero_3 = get!(world, (player.id), (Hero3));

        if hero_1.hero_type.is_some() {
            hero_1.exp += plus_exp;
            emit!(world, Hero1ExpIncreased {hero_1, player});
            set!(world, (hero_1));
        }

        if hero_2.hero_type.is_some() {
            hero_2.exp += plus_exp;
            emit!(world, Hero2ExpIncreased {hero_2, player});
            set!(world, (hero_2));

        }

        if hero_3.hero_type.is_some() {
            hero_3.exp += plus_exp;
            emit!(world, Hero3ExpIncreased {hero_3, player});
            set!(world, (hero_3));
        }
    }
}

#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
    use starknet::testing::set_contract_address;
    use core::debug::PrintTrait;

    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    use super::{actions,IActions, IActionsDispatcher, IActionsDispatcherTrait};
    use sylvan_bastion_defence::models::{Player, player, heroes::{Hero1, Hero2, Hero3, HeroType, HeroTypeTrait}, dungeon::{DungeonType, CurrentDungeon, current_dungeon},};

    fn init() -> IWorldDispatcher {
        // models
        let mut models = array::ArrayTrait::new();
        models.append(player::TEST_CLASS_HASH);
        models.append(current_dungeon::TEST_CLASS_HASH);

        // deploy world with models
        let world = spawn_test_world(models);
        world
    }

    #[test]
    #[available_gas(200000000)]
    fn create_player_ok() {
        let player_address = starknet::contract_address_const::<0x01>();
        
        let world = init();

        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions = IActionsDispatcher { contract_address };
        // to call contract from first address
        set_contract_address(player_address);
        actions.create_player();
        let player = get!(world, (player_address), (Player));
    }

    #[test]
    #[available_gas(2000000000)]
    fn hire_hero_ok() {
        let player_address = starknet::contract_address_const::<0x01>();
        
        let world = init();

        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions = IActionsDispatcher { contract_address };
        // to call contract from first address
        set_contract_address(player_address);
        actions.create_player();

        //test
        actions.hire_hero(1, HeroType::Archer);
        let player = get!(world, (player_address), (Player));
        let hero_1 = get!(world, (player_address), (Hero1));
        let hero_2 = get!(world, (player_address), (Hero2));
        let hero_3 = get!(world, (player_address), (Hero3));

        assert(hero_1.hero_type == HeroType::Archer, 'pos_1.hero_type != Archer');
        assert(hero_2.hero_type == HeroType::None, 'pos_2.hero_type != None');

        actions.hire_hero(3, HeroType::Druid);
        let player = get!(world, (player_address), (Player));
        let hero_1 = get!(world, (player_address), (Hero1));
        let hero_2 = get!(world, (player_address), (Hero2));
        let hero_3 = get!(world, (player_address), (Hero3));

        assert(hero_1.hero_type == HeroType::Archer, 'pos_1.hero_type != Archer');
        assert(hero_2.hero_type == HeroType::None, 'pos_2.hero_type != None');
        assert(hero_3.hero_type == HeroType::Druid, 'pos_3.hero_type != Druid');

        actions.hire_hero(1, HeroType::Mage);
        let player = get!(world, (player_address), (Player));
        let hero_1 = get!(world, (player_address), (Hero1));
        let hero_2 = get!(world, (player_address), (Hero2));
        let hero_3 = get!(world, (player_address), (Hero3));

        assert(hero_1.hero_type == HeroType::Mage, 'pos_1.hero_type != Archer');
        assert(hero_2.hero_type == HeroType::None, 'pos_2.hero_type != None');
        assert(hero_3.hero_type == HeroType::Druid, 'pos_3.hero_type != Druid');
    }

    #[test]
    #[available_gas(2000000000)]
    fn enter_dungeon_ok() {
        let player_address = starknet::contract_address_const::<0x01>();
        
        let world = init();

        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions = IActionsDispatcher { contract_address };
        // to call contract from first address
        set_contract_address(player_address);
        actions.create_player();

        // hire a party
        actions.hire_hero(1, HeroType::Archer);
        actions.hire_hero(2, HeroType::Druid);
        actions.hire_hero(3, HeroType::Mage);

        actions.enter_dungeon(DungeonType::GoblinCamp, 50);
    }

    #[test]
    #[available_gas(2000000000)]
    fn next_room_ok() {
        let player_address = starknet::contract_address_const::<0x01>();
        
        let world = init();

        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions = IActionsDispatcher { contract_address };
        // to call contract from first address
        set_contract_address(player_address);
        actions.create_player();

        let player = get!(world, (player_address), (Player));
        let current_dungeon = get!(world, (player_address), (CurrentDungeon));
        current_dungeon.dungeon_type.print();

        // hire a party
        actions.hire_hero(1, HeroType::Archer);
        actions.hire_hero(2, HeroType::Druid);
        actions.hire_hero(3, HeroType::Mage);

        actions.enter_dungeon(DungeonType::BlackTower, 100);

        let player = get!(world, (player_address), (Player));
        let current_dungeon = get!(world, (player_address), (CurrentDungeon));
        assert(current_dungeon.dungeon_type == DungeonType::BlackTower, 'Wrong Dungeon');

        actions.next_room();
        let current_dungeon = get!(world, (player_address), (CurrentDungeon));
        assert(current_dungeon.dungeon_type == DungeonType::BlackTower, 'Wrong Dungeon');


        actions.next_room();

        let current_dungeon = get!(world, (player_address), (CurrentDungeon));
        let hero_1 = get!(world, (player_address), (Hero1));
        let hero_2 = get!(world, (player_address), (Hero2));
        let hero_3 = get!(world, (player_address), (Hero3));
        assert(current_dungeon.dungeon_type == DungeonType::BlackTower, 'Wrong Dungeon');
    }

    #[test]
    #[available_gas(2000000000)]
    fn leave_dungeon_ok() {
        let player_address = starknet::contract_address_const::<0x01>();
        
        let world = init();

        let contract_address = world
            .deploy_contract('salt', actions::TEST_CLASS_HASH.try_into().unwrap());
        let actions = IActionsDispatcher { contract_address };
        // to call contract from first address
        set_contract_address(player_address);
        actions.create_player();

        // hire a party
        actions.hire_hero(1, HeroType::Archer);
        actions.hire_hero(2, HeroType::Druid);
        actions.hire_hero(3, HeroType::Mage);

        actions.enter_dungeon(DungeonType::BlackTower, 5000);
        let current_dungeon = get!(world, (player_address), (CurrentDungeon));
        assert(current_dungeon.dungeon_type == DungeonType::BlackTower, 'Wrong Dungeon');
        actions.next_room();
        let current_dungeon = get!(world, (player_address), (CurrentDungeon));
        assert(current_dungeon.dungeon_type == DungeonType::BlackTower, 'Wrong Dungeon');
        actions.leave_dungeon();
        let current_dungeon = get!(world, (player_address), (CurrentDungeon));
        assert(current_dungeon.dungeon_type == DungeonType::None, 'Wrong Dungeon');
    }
}
