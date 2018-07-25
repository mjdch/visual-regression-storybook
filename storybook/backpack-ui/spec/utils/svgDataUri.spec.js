import { expect } from "chai";
import svgDataUri from "../../src/utils/svgDataUri";

const svg = "<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" fill=\"#fff\"><path d=\"M27 4l-15 15-7-7-5 5 12 12 20-20z\"></path></svg>";

describe("svgDataUri", () => {
  it("should render an SVG as a data URI", () => {
    expect(svgDataUri(svg)).to.equal("data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22%23fff%22%3E%3Cpath%20d%3D%22M27%204l-15%2015-7-7-5%205%2012%2012%2020-20z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
  });
});
