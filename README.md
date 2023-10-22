Auto battler powered with Dojo engine 🎇🏹🛡🗡⚔🌟

# how to start
Terminal 1 - Katana:
```cd game && katana --disable-fee```
Terminal 2 - Contracts:
```cd game && sozo build && sozo migrate```

// Basic Auth - This will allow burner Accounts to interact with the contracts
```sh ./game/scripts/default_auth.sh```
Terminal 3 - Client:
```cd client && yarn && yarn dev```

Terminal 4 - Torii:
Uncomment the 'world_address' parameter in dojo-starter/Scarb.toml then:

```cd game && torii --world <WORLD_ADDRESS>```