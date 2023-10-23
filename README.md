# Sylvan Bastions Defence

Auto battler powered with Dojo engine 🎇🏹🛡🗡⚔🌟

In The Defence of Sylvan Bastions, you can lead a team of three heroes ⚔ to protect the realm of the wood elves from various dangers. You can customize your team by choosing from different hero classes and find the best combination for your strategy. You can then challenge different dungeons, where you will face enemies in an autobattle mode. You don't have to control your heroes manually. The game takes place in the Wood Elves Valley, a beautiful and mysterious land where you can discover the secrets and stories of the wood elves and their foes.

## How to start game
Terminal 1 - Katana:

```cd game && katana --disable-fee```

Terminal 2 - Contracts:

```cd game && sozo build && sozo migrate```

// Basic Auth - This will allow burner Accounts to interact with the contracts

```cd game && ./scripts/default_auth.sh```

Terminal 3 - Client:

```cd client && yarn && yarn dev```


Terminal 4 - Torii:
Add the 'world_address' parameter from Terminal 2 then:

```cd game && torii --world <WORLD_ADDRESS>```

navigate to http://localhost:5173/ and enjoy! (☆▽☆)