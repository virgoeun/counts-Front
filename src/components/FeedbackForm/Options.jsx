import React from "react";
import styled from "@emotion/styled";

import { RatingButton } from "./FormButton";

const RatingButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
`;

// const SubscriptContainer = styled.div`
//   margin: 10px;
//   display: flex;
//   justify-content: space-between;
// `;

export default function Rating({ onSelect }) {
  return (
    <div>
      <RatingButtonContainer>
        {[...Array(10).keys()].map((n) => (
          <RatingButton
            key={`rating-${n + 1}`}
            onClick={onSelect}
            value={n + 1}
          >
            {n + 1}
          </RatingButton>
        ))}
      </RatingButtonContainer>
      {/* <SubscriptContainer>
        <sub>Not at all likely</sub>
        <sub>Extremely likely</sub>
      </SubscriptContainer> */}
    </div>
  );
}
