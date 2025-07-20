import React from "react";

function MainContent() {
  const favouriteCities = {
    fontWeight: "bold",
    color: "blue",

  };
  return (
    <div>
      <main>
        <p>
          I love to visit <span style={favouriteCities}>New York</span>, <span style={favouriteCities}>Paris</span>, and{" "}
          <span style={favouriteCities}>Tokyo</span>.
        </p>
      </main>
    </div>
  );
}

export default MainContent;
