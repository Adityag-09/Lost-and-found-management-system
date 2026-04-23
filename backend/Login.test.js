import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';
import * as api from '../../api'; // Import all exports from api.js

// Mock the api module
jest.mock('../../api', () => ({
  ...jest.requireActual('../../api'), // Import and retain default behavior
  login: jest.fn(), // Mock the login function
}));

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Login Page', () => {
  beforeEach(() => {
    // Clear mock history before each test
    api.login.mockClear();
    mockedNavigate.mockClear();
  });

  it('should allow a user to log in and redirects on success', async () => {
    // Mock a successful API response
    api.login.mockResolvedValue({ data: { token: 'fake-token' } });

    render(<Router><Login /></Router>);

    // Find form elements
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Wait for the async operations to complete
    await waitFor(() => expect(api.login).toHaveBeenCalledWith('test@example.com', 'password123'));
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/dashboard'));
  });
});