import React from "react";
import "../index.css";

import Dungeon, { DungeonInfo, DungeonType } from "./Dungeon";
import Bastion, { BastionInfo } from "./Bastion";

type MapProps = {
  imageUrl: string;
  onBlockClick: (info: DungeonInfo | BastionInfo) => void;
};

const Map: React.FC<MapProps> = ({ imageUrl, onBlockClick }) => {
  const mapStyles: React.CSSProperties = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    // backgroundSize: "contain",
    // width: "70%",
    height: "120vh",
    // height: window.innerHeight,
    // height: window.innerHeight,
    width: window.innerWidth,

    // width: "900px",
    // height: "900px",
    // height: "100%",
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: "10px",
    flex: "0 0 65%",
  };

  const checkIndex = index => {
    if (index == 1 || index == 9 || index == 13) {
      return true;
    }

    return false;
  };

  const dungeons: Array<DungeonType> = [];
  const bastions = Array.from({ length: 3 }, (_, index) => index + 1);

  for (let i = 0; i < 13; i++) {
    dungeons.push({
      index: i + 1,
      name: `dungeon ${i + 1}`,
      description: null,
      image: null,
    });
  }

  dungeons.forEach(dungeon => {
    if (dungeon.index === 1) {
      dungeon.name = "Village of witches";
      dungeon.description =
        "In the valley of the forest elves, there is a village of witches who were the first humans to settle in this land. They pose a great danger to the forest kingdoms, as they use their dark magic to harm the nature and its creatures. They cast wicked spells on the trees and plants, making them wither and die. They also breed monstrous beings that are unknown to any other race, and use them as their servants and weapons. You have to stand up against the witches and their evil forces, and try to stop their sinister plans. You have to fight them with courage and skill, and try to weaken their power and influence";
      dungeon.image = `./src/assets/game/descriptions/dungeon_${dungeon.index}.jpg`;
    } else if (dungeon.index === 9) {
      dungeon.name = "Goblin Camp";
      dungeon.description =
        "Hunters Village is under constant attack from a horde of goblins who have invaded the nearby forest. The goblins are vicious and cunning, and they raid the village for food, supplies, and captives. They also destroy the crops and livestock, and set fire to the houses. The villagers live in fear and despair, and they need your help to defend their home. You have to fight the goblins with bravery and skill, and try to reduce their numbers and strength. You have to face them in battle, and show them that Hunters Village is not an easy prey";
      dungeon.image = `./src/assets/game/descriptions/dungeon_${dungeon.index}.jpg`;
    } else if (dungeon.index === 13) {
      dungeon.name = "Dark tower";
      dungeon.description =
        "There is a dark and sinister tower that stands alone in the midst of a haunted land. The tower is surrounded by horrors that defy the laws of nature - the dead do not rest in peace, but rise from their graves to stalk the living. The ghosts of the past haunt not only the solitary travelers who dare to approach the tower, but also the forest elves who live in the nearby villages. You must brave the dangers and explore the tower, hoping to discover what is the source of this evil power that corrupts everything around it";
      dungeon.image = `./src/assets/game/descriptions/dungeon_${dungeon.index}.jpg`;
    }
  });

  return (
    <div style={mapStyles}>
      {dungeons.map(dungeon => (
        <Dungeon
          key={dungeon.index}
          imageUrl={`./src/assets/game/structures/dungeon_${dungeon.index}.png`}
          index={dungeon.index}
          onClick={onBlockClick}
          isActive={checkIndex(dungeon.index)}
          description={dungeon.description}
          imageBig={dungeon.image}
          name={dungeon.name}
        />
      ))}
      {bastions.map(index => (
        <Bastion
          key={index}
          imageUrl={`./src/assets/game/structures/bastion_${index}.png`}
          index={index}
          onClick={onBlockClick}
        />
      ))}
    </div>
  );
};

export default Map;
