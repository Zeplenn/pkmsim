# Pkmsim

Welcome to the Pkmsim project! It allows you to simulate a battle between two Pokémon with simplified mechanics. I made this website in one day, and you can take a look on [zepleen.github.io/pkmsim](https://zeplenn.github.io/pkmsim).

## Description

This project simulates a battle between two Pokémon. Each Pokémon has basic stats and can perform a unique attack, which combines all of the Pokémon's types.

### How It Works

- The user interface allows you to select two Pokémon and simulate a battle between them using this simplified mechanic.
- Each Pokémon has a single attack. This attack considers all of the Pokémon's types simultaneously, and the damage dealt is adjusted based on the opponent's resistances and weaknesses of the types.

### Limitations

- **Simplified battle mechanics**: This simulator does not fully reflect the battle mechanics of the official Pokémon games. In the official games, a Pokémon can have multiple attacks of different types, which makes the resistance and weakness interactions more complex.
- **Simplified resistance system**: The handling of resistances is also simplified. The resistances of each of the opponent's types are combined to calculate the damage taken, but this may differ from how it works in the official games.

## Technologies Used

- HTML for the page structure.
- Bootstrap for designing the user interface, ensuring a responsive and intuitive layout.
- JavaScript for the battle logic and simulation.
- [Tyradex](https://tyradex.tech), a Pokémon API, to fetch Pokémon information, their types, and base stats.