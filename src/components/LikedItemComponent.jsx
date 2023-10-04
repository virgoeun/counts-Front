import React from "react";
import LikeStyleButton from "./LikeStyleButton";

const LikedItemsComponent = ({ items, itemType }) => {
  return (
    <div>
      <h2>Liked {itemType}s:</h2>
      {items.map((item) => (
        <div key={item._id}>
          <span>{item.name}</span>
          <LikeStyleButton
            styleId={item._id}
            onUpdateLikeCount={() => {
              // Do something when like count is updated
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default LikedItemsComponent;
