import React from "react";

export type DungeonType = {
  index: number;
  name: string | null;
  description: string | null;
  image: string | null;
};

export type DungeonInfo = {
  name: string;
  description: string | null;
  image: string | null;
  is_dungeon: boolean;
};

type DungeonProps = {
  imageUrl: string;
  index: number;
  onClick: (info: DungeonInfo) => void;
  isActive: boolean;
  description: string | null;
  imageBig: string | null;
  name: string | null;
};

const Dungeon: React.FC<DungeonProps> = ({
  imageUrl,
  index,
  onClick,
  isActive,
  description,
  imageBig,
  name,
}) => {
  const dungeonStyles: React.CSSProperties = {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: "2px solid red",
    overflow: "hidden",
  };

  const dungeonImageStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  let handleClick: (() => void) | null = () => {
    const dungeonInfo: DungeonInfo = {
      name: name,
      description: description,
      image: imageBig,
      is_dungeon: true,
    };

    onClick(dungeonInfo);
  };

  if (!isActive) {
    dungeonStyles.filter = "grayscale(100%)";
    dungeonStyles.border = "2px solid gray";
    handleClick = null;
  }

  const dungeonBlockId = `dungeon-block-${index}`;
  return (
    <div className="dungeon-block" id={dungeonBlockId} style={dungeonStyles} onClick={handleClick}>
      <img
        className="dungeon-image-block"
        style={dungeonImageStyles}
        src={imageUrl}
        alt="Dungeon image"
      />
    </div>
  );
};

export default Dungeon;
