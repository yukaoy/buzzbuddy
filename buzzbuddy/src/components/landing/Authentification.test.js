import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LogIn from "./LogIn";
import MiniProfile from "../main/MiniProfile";
import { BrowserRouter as Router } from "react-router-dom";

const setup = () => {
  return {
    ...render(
      <Router>
        <LogIn />
        <MiniProfile user="Bret" />
      </Router>
    ),
  };
};

describe("Authentification validation", () => {
  beforeEach(() => {
    setup();
    localStorage.setItem("loggedInState", false);
    localStorage.setItem("loggedInUser", "");
  });
  afterEach(() => {});

  it("should log in a previously registered user", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              username: "Bret",
              address: { street: "Kulas Light" },
            },
          ]),
      })
    );

    await act(async () => {
      // input the username and password
      fireEvent.change(screen.getByTestId("username-login"), {
        target: { value: "Bret" },
      });
      fireEvent.change(screen.getByTestId("password-login"), {
        target: { value: "Kulas Light" },
      });
      // login
      fireEvent.click(screen.getByTestId("login-button"));

      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users?username=Bret"
        )
      );
    });
    await waitFor(() =>
      expect(localStorage.getItem("loggedInState")).toBe("true")
    );
    await waitFor(() =>
      expect(localStorage.getItem("loggedInUser")).toBe("Bret")
    );
  });

  it("should not log in user that does not exists", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
    await act(async () => {
      // input the username and password
      fireEvent.change(screen.getByTestId("username-login"), {
        target: { value: "abc" },
      });
      fireEvent.change(screen.getByTestId("password-login"), {
        target: { value: "Kulas Light" },
      });
      // login
      fireEvent.click(screen.getByTestId("login-button"));

      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users?username=abc"
        )
      );
    });
    // Assert that user is not successfully logged in
    await waitFor(() =>
      expect(localStorage.getItem("loggedInState")).toBe("false")
    );
    await waitFor(() => expect(localStorage.getItem("loggedInUser")).toBe(""));
    // Assert error state/message
    await waitFor(() =>
      expect(screen.getByTestId("username-error").textContent).toBe(
        "User does not exist."
      )
    );
  });

  it("should not log in user with incorrect password", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              username: "Bret",
              address: { street: "Kulas Light" },
            },
          ]),
      })
    );
    await act(async () => {
      // input the username and password
      fireEvent.change(screen.getByTestId("username-login"), {
        target: { value: "Bret" },
      });
      fireEvent.change(screen.getByTestId("password-login"), {
        target: { value: "abc" },
      });
      // login
      fireEvent.click(screen.getByTestId("login-button"));

      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users?username=Bret"
        )
      );
    });
    // Assert that user is not successfully logged in
    await waitFor(() =>
      expect(localStorage.getItem("loggedInState")).toBe("false")
    );
    await waitFor(() => expect(localStorage.getItem("loggedInUser")).toBe(""));
    // Assert error state/message
    await waitFor(() =>
      expect(screen.getByTestId("password-error").textContent).toBe(
        "Password is incorrect."
      )
    );
  });

  it("should logout a user", async () => {
    await act(async () => {
      // logout
      fireEvent.click(screen.getByTestId("logout-button"));
    });
    await waitFor(() => expect(localStorage.getItem("loggedInUser")).toBe(null));
    await waitFor(() => expect(localStorage.getItem("loggedInState")).toBe("false"));
  });
});
