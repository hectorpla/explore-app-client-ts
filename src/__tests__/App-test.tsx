import "react-native";
import React from "react";
import App, { Root } from "../App";
import renderer from "react-test-renderer";
import { createMemoryHistory } from "history";
// import NavigationTestUtils from "react-navigation/NavigationTestUtils";

describe("App snapshot", () => {
  jest.useFakeTimers();
  beforeEach(() => {
    // NavigationTestUtils.resetInternalState();
  });

  const history = createMemoryHistory();

  it("renders the loading screen", async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the root without loading screen", async () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
