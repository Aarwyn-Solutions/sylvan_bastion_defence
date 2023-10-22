import React from "react";

export type BastionInfo = {
  name: string;
  description: string;
  image: string | null;
};

type BastionProps = {
  imageUrl: string;
  index: number;
  onClick: (info: BastionInfo) => void;
};

const Bastion: React.FC<BastionProps> = ({ imageUrl, index, onClick }) => {
  const bastionStyles: React.CSSProperties = {
    width: "148px",
    height: "142px",
    borderRadius: "50%",
    border: "4px solid white",
    overflow: "hidden",
  };

  const bastionImageStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const handleClick = () => {
    const bastionInfo: BastionInfo = {
      name: `Bastion ${index}`,
      description: `Description block for ${index}`,
      image: null,
    };

    onClick(bastionInfo);
  };

  const bastionBlockId = `bastion-block-${index}`;
  return (
    <div className="bastion-block" id={bastionBlockId} style={bastionStyles} onClick={handleClick}>
      <img
        className="bastion-image-block"
        style={bastionImageStyles}
        src={imageUrl}
        alt="Bastion image"
      />
    </div>
  );
};

export default Bastion;
