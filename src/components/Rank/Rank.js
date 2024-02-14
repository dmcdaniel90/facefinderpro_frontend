import React from "react";
import { useStore } from "../../store";

const Rank = () => {
  const { name, entries } = useStore((state) => state.user);

  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
    </div>
  );
};

export default Rank;
