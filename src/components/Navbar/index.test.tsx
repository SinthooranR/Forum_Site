import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";
import { AuthProvider, useAuth } from "@/util/auth-context"; // Assuming you have an AuthProvider for testing

// Mock the useAuth hook
jest.mock("@/util/auth-context", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders properly when user is logged in", () => {
    const user = { name: "Test User" }; // Mock user data
    const logoutMock = jest.fn(); // Mock logout function

    // Mock useAuth hook return values
    (useAuth as jest.Mock).mockReturnValue({ user, logout: logoutMock });

    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    // Assert links and profile dropdown are rendered
    expect(screen.getByText("Forum Site")).toBeInTheDocument();
    expect(screen.getByText("Threads")).toBeInTheDocument();
    expect(screen.getByText("Comments")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders properly when user is logged out", () => {
    // Mock useAuth hook return values
    (useAuth as jest.Mock).mockReturnValue({ user: null, logout: jest.fn() });

    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    // Assert login/register link is rendered
    expect(screen.getByText("Login/Register")).toBeInTheDocument();
  });

  it("toggles dropdown when profile button is clicked", () => {
    // Mock useAuth hook return values
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: "Test User" },
      logout: jest.fn(),
    });

    render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );

    // Assert dropdown is initially closed
    expect(screen.queryByText("View Profile")).not.toBeInTheDocument();

    // Click profile button to open dropdown
    fireEvent.click(screen.getByText("Profile"));

    // Assert dropdown is opened
    expect(screen.getByText("View Profile")).toBeInTheDocument();

    // Click profile button again to close dropdown
    fireEvent.click(screen.getByText("Profile"));

    // Assert dropdown is closed
    expect(screen.queryByText("View Profile")).not.toBeInTheDocument();
  });
});
