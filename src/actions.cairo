use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use starknet::{ContractAddress, ClassHash};

use sylvan_bastion_defence::models::{Player, Hero, HeroType, HeroTrait, Artifact, dungeon::{DungeonType, CurrentDungeon}, };

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

    use sylvan_bastion_defence::models::{Player, PlayerTrait, Hero, HeroType, HeroTrait, Artifact, dungeon::{DungeonType, DungeonTypeTrait, CurrentDungeon, CurrentDungeonTrait}, fight::fight};

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PlayerCreated: PlayerCreated,
        DungeonEntered: DungeonEntered,
        DungeonLeft: DungeonLeft,
    }

    #[derive(Drop, starknet::Event)]
    struct PlayerCreated {
        id: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct DungeonEntered {
        id: ContractAddress,
        dungeon_type: DungeonType,
    }

    #[derive(Drop, starknet::Event)]
    struct DungeonLeft {
        id: ContractAddress,
        dungeon_type: DungeonType,
    }


    // impl: implement functions specified in trait
    #[external(v0)]
    impl ActionImpl of IActions<ContractState> {
        fn create_player(self: @ContractState,) {
            let world = self.world_dispatcher.read();
            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();

            set!(world, (Player {
                id: player,
                exp: 0_u32,
                gold: 100_u32,
                in_dungeon: false,
                pos_1: HeroTrait::default(),
                pos_2: HeroTrait::default(),
                pos_3: HeroTrait::default(),
                pos_4: HeroTrait::default(),
                pos_5: HeroTrait::default(),
            }));
        }

        fn hire_hero(self: @ContractState, position: u8, hero: HeroType) {
            let world = self.world_dispatcher.read();
            // Get the address of the current caller, possibly the player's address.
            let id = get_caller_address();

            assert(position < 6 && position >0, 'position wrong');

            let mut player = get!(world, (id), (Player));
            add_hero_on_pos(ref player, position, hero);
            set!(world, (player));
        }

        fn enter_dungeon(self: @ContractState, dungeon_type: DungeonType, gold: u32) {
            let world = self.world_dispatcher.read();

            // Get the address of the current caller, possibly the player's address.
            let id = get_caller_address();

            assert(dungeon_type.is_some(), 'wrong dungeon');

            let mut player = get!(world, (id), (Player));
            assert(player.gold >= gold, 'not enough gold');
            player.gold -= gold;

            let mut current_dungeon = get!(world, (id), (CurrentDungeon));
            current_dungeon.squad_health = gold*100;
            current_dungeon.current_room = 1;

            assert(!current_dungeon.dungeon_type.is_some(), 'another dungeon is in progress');

            do_fight(ref player, ref current_dungeon, world);

            set!(world, (player));
            set!(world, (current_dungeon));
        }

        fn next_room(self: @ContractState) {
            let id = get_caller_address();
            let world = self.world_dispatcher.read();

            let mut player = get!(world, (id), (Player));
            let mut current_dungeon = get!(world, (id), (CurrentDungeon));
            current_dungeon.current_room += 1;

            do_fight(ref player, ref current_dungeon, world);

            if current_dungeon.current_room >= current_dungeon.dungeon_type.dungeon_room_count() {
                // give all rewards
                let gold_reward = current_dungeon.dungeon_type.gold_reward();
                player.gold += gold_reward;
                // leave dungeon
                do_leave_dungeon(world, ref current_dungeon);
            }

            set!(world, (player));
            set!(world, (current_dungeon));
        }

        fn leave_dungeon(self: @ContractState) {
            let world = self.world_dispatcher.read();
            let id = get_caller_address();
            let mut current_dungeon = get!(world, (id), (CurrentDungeon));
            assert(current_dungeon.dungeon_type.is_some(), 'dungeon is not in progress');
            do_leave_dungeon(world, ref current_dungeon);
        }
    }

    // helper functions
    fn add_hero_on_pos(ref player: Player, position: u8, hero: HeroType) {
        assert(player.gold >=10, 'not enough gold');
        player.gold -= 10;
        if position ==1 {
            player.pos_1 = HeroTrait::new(hero);
        } else if position ==2 {
            player.pos_2 = HeroTrait::new(hero);
        } else if position ==3 {
            player.pos_3 = HeroTrait::new(hero);
        } else if position ==4 {
            player.pos_4 = HeroTrait::new(hero);
        } else if position ==5 {
            player.pos_5 = HeroTrait::new(hero);
        }
    }

    fn do_fight(ref player: Player, ref current_dungeon: CurrentDungeon, world: IWorldDispatcher) {
        let dungeon_type = current_dungeon.dungeon_type;

        // TODO! Remake to random from the interval
        let (dungeon_force, _) = dungeon_type.dungeon_force_interval();
        let (dungeon_def, _) = dungeon_type.dungeon_defence_interval();

        let fight_result = fight(player.calculate_squad_force(), player.calculate_squad_defence(), dungeon_force, dungeon_def);

        if fight_result.minus_health >= current_dungeon.squad_health {
            let new_player_exp = match integer::u32_checked_sub(player.exp, fight_result.plus_player_xp) {
                Option::Some(a) => a,
                Option::None => 0,
            };

            player.exp /= 2;
            do_leave_dungeon(world, ref current_dungeon);
        } else {
            player.exp += fight_result.plus_player_xp;
            player.add_heroes_exp(fight_result.plus_heroes_xp);
        }
    }

    fn do_leave_dungeon(world: IWorldDispatcher, ref current_dungeon: CurrentDungeon) {
        let dungeon_type = current_dungeon.dungeon_type;
        let id = get_caller_address();
        emit!(world, DungeonLeft { id, dungeon_type });
        current_dungeon.reset();
    }
}

#[cfg(test)]
mod tests {
    use starknet::class_hash::Felt252TryIntoClassHash;
     use starknet::testing::set_contract_address;

    // import world dispatcher
    use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

    // import test utils
    use dojo::test_utils::{spawn_test_world, deploy_contract};

    use super::{actions,IActions, IActionsDispatcher, IActionsDispatcherTrait};
    use sylvan_bastion_defence::models::{Player,player,  Hero, HeroType, HeroTrait, Artifact, DungeonType, CurrentDungeon, current_dungeon};

    fn init() -> IWorldDispatcher {
        // models
        let mut models = array::ArrayTrait::new();
        models.append(player::TEST_CLASS_HASH);
        models.append(current_dungeon::TEST_CLASS_HASH);

        // deploy world with models
        let world = spawn_test_world(models);
        world
    }

    // fn player_created() -> 

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
        assert(!player.in_dungeon, '!player.in_dungeon');
        assert(player.pos_1.hero_type == HeroType::None, 'pos_1 == Hero::None');
        assert(player.pos_2.hero_type == HeroType::None, 'pos_2 == Hero::None');
        assert(player.pos_3.hero_type == HeroType::None, 'pos_3 == Hero::None');
        assert(player.pos_4.hero_type == HeroType::None, 'pos_4 == Hero::None');
        assert(player.pos_5.hero_type == HeroType::None, 'pos_5 == Hero::None');
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

        assert(player.pos_1.hero_type == HeroType::Archer, 'pos_1.hero_type != Archer');
        assert(player.pos_2.hero_type == HeroType::None, 'pos_2.hero_type != None');

        actions.hire_hero(3, HeroType::Druid);
        let player = get!(world, (player_address), (Player));

        assert(player.pos_1.hero_type == HeroType::Archer, 'pos_1.hero_type != Archer');
        assert(player.pos_2.hero_type == HeroType::None, 'pos_2.hero_type != None');
        assert(player.pos_3.hero_type == HeroType::Druid, 'pos_3.hero_type != Druid');

        actions.hire_hero(1, HeroType::Mage);
        let player = get!(world, (player_address), (Player));

        assert(player.pos_1.hero_type == HeroType::Mage, 'pos_1.hero_type != Archer');
        assert(player.pos_2.hero_type == HeroType::None, 'pos_2.hero_type != None');
        assert(player.pos_3.hero_type == HeroType::Druid, 'pos_3.hero_type != Druid');

    }
}
