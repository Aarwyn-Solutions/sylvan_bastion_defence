use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};
use starknet::{ContractAddress, ClassHash};

use sylvan_bastion_defence::models::{Player, Hero, HeroType, HeroTrait, Artifact, DungeonType, CurrentDungeon};

// define the interface
#[starknet::interface]
trait IActions<TContractState> {
    fn create_player(self: @TContractState);
    fn hire_hero(self: @TContractState, position: u8, hero: HeroType);
    fn enter_dungeon(self: @TContractState,);
}

// dojo decorator
#[dojo::contract]
mod actions {
    use starknet::{ContractAddress, get_caller_address};
    use super::IActions;

    use sylvan_bastion_defence::models::{Player, Hero, HeroType, HeroTrait, Artifact, DungeonType, CurrentDungeon};

    // declaring custom event struct
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Moved: Moved,
    }

    // declaring custom event struct
    #[derive(Drop, starknet::Event)]
    struct Moved {
        player: ContractAddress,
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
                experience: 0_u32,
                gold: 100_u32,
                in_dungeon: false,
                pos_1: HeroTrait::default(),
                pos_2: HeroTrait::default(),
                pos_3: HeroTrait::default(),
                pos_4: HeroTrait::default(),
                pos_5: HeroTrait::default(),
            }));
        }

        fn hire_hero(self: @ContractState, position: u8, hero: HeroType) {}
        fn enter_dungeon(self: @ContractState, ) {}
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
}
