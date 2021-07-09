import get from "lodash/get";

export const LodashSamples = () => {
  let names;
  console.log("a", get(names, ["length"], 0));
  return (
    <div>
      Lodash
    </div>
  );
}

