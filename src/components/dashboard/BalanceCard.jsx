import React from "react";

const BalanceCard = () => (
  <div
    className="
mt-6
p-6
rounded-3xl
text-white
bg-gradient-to-r
from-blue-600
to-green-500
shadow-lg
"
  >
    <p>Total Balance</p>

    <h1
      className="
text-4xl
font-bold
mt-3
"
    >
      ₹24,560
    </h1>

    <div
      className="
flex
justify-between
mt-6
"
    >
      <div>
        <p
          className="
text-sm
opacity-80
"
        >
          You owe
        </p>

        <b>₹3450</b>
      </div>

      <div>
        <p
          className="
text-sm
opacity-80
"
        >
          You get
        </p>

        <b>₹7850</b>
      </div>
    </div>
  </div>
);

export default BalanceCard;
