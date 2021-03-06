/* eslint-disable no-console */
import { renderHook, cleanup } from "react-hooks-testing-library";
import useTask from "../src";
import { KeepValue } from "../src/types";

afterEach(cleanup);

afterEach(function() {
  jest.clearAllMocks();
});

test("it prevents changing concurrency strategies", () => {
  jest.spyOn(console, "warn").mockImplementation();
  const work = jest.fn();

  const { rerender } = renderHook(({ keep }) => useTask(work, { keep }), {
    initialProps: {
      keep: "first" as KeepValue
    }
  });

  rerender({ keep: "last" });

  expect(console.warn).toBeCalledTimes(1);
});
