import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Main from "../../pages/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent } from "@testing-library/react";

const setup = () => {
  return {
    ...render(
      <Router>
        <Main />
      </Router>
    ),
  };
};

describe("Articles Validation", () => {
  beforeEach(() => {
    localStorage.setItem("loggedInUser", "Bret");
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("should fetch all articles for current logged in user", async () => {
    const mockUserResponse = {
      id: 1,
      username: "Bret",
      address: { street: "Kulas Light" },
    };

    const mockPostsResponse = [
      {
        userId: 1,
        title: "Article 1",
        body: "Body of article 1",
      },
      {
        userId: 1,
        title: "Article 2",
        body: "Body of article 2",
      },
    ];

    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => mockUserResponse,
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => mockPostsResponse,
        })
      );

    act(() => {
      setup();
    });

    await act(async () => {
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    });

    expect(screen.getByText("Article 1")).toBeInTheDocument();
    expect(screen.getByText("Article 2")).toBeInTheDocument();
  });

  it("should fetch subset of articles for current logged in user given search keyword", async () => {
    const mockUser = {
      id: 1,
      username: "Bret",
      address: { street: "Kulas Light" },
    };

    const mockPosts = [
      {
        userId: 1,
        title: "Article 1",
        body: "Body of article 1",
      },
      {
        userId: 1,
        title: "Article 2",
        body: "Body of article 2",
      },
    ];

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockUser),
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPosts),
      });

    await act(async () => {
      setup();
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId("search-bar"), {
        target: { value: "2" },
      });
    });

    await waitFor(() =>
      expect(screen.queryByText("Article 1")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryByText("Article 2")).toBeInTheDocument()
    );
  });

  // it("should add articles when adding a follower", async() => {

  // });
});
