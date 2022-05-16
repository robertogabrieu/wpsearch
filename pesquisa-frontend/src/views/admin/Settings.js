import React from "react";

// components

import CardSettings from "../../components/Cards/CardSettings";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="mx-auto w-full lg:w-10/12 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}
