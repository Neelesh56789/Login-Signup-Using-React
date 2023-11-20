import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { Auth } from './components/Auth'

describe('Signup Component', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  test('shows an alert if any field is empty on form submission', () => {
    render(<Signup onLoginClick={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Neelesh' } });
    // Leave the email and password fields empty

    fireEvent.click(screen.getByText('SignUp'));

    // Check if the alert was called
    expect(window.alert).toHaveBeenCalledWith('Fill the input fields correctly');
  });
  it('should allow entering a name', () => {
    render(<Signup onLoginClick={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    expect(screen.getByPlaceholderText('Name').value).toBe('John Doe');
  });

  it('should allow entering an email', () => {
    render(<Signup onLoginClick={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    expect(screen.getByPlaceholderText('Email').value).toBe('john@example.com');
  });

  it('should allow entering a password', () => {
    render(<Signup onLoginClick={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    expect(screen.getByPlaceholderText('Password').value).toBe('password123');
  });
  test('updates name, email, and password fields on change', () => {
    render(<Signup onLoginClick={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  test('shows a success alert and redirects to login on correct form submission', () => {
    const onLoginClick = jest.fn(); // Mock function for redirection
    render(<Signup onLoginClick={onLoginClick} />);

    // Fill all fields correctly
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('SignUp'));

    // Check if the alert was called with the success message
    expect(window.alert).toHaveBeenCalledWith('You have successfully registered!');

    // Check if onLoginClick (redirection function) was called
    expect(onLoginClick).toHaveBeenCalled();
  });
});
describe('Login Component', () => {
  it('should show an alert and login when the form is filled correctly', async () => {
    // Mock the global alert function
    global.alert = jest.fn();

    // Render the Login component
    render(<Login onSignupClick={() => {}} />);

    // Simulate filling in the email and password fields
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Use findByText for asynchronous elements (if needed)
    const loginButton = await screen.findByRole('button', { name: /Login/i });

    // Simulate clicking the login button
    fireEvent.click(loginButton);

    // Check if alert is called with the correct message
    expect(global.alert).toHaveBeenCalledWith('You have successfully Logged In!');
  });
  it('should show an alert and login when the form is filled correctly', async () => {
    // Mock the global alert function
    const originalAlert = global.alert;
    global.alert = jest.fn();

    // Render the Login component
    render(<Login onSignupClick={() => {}} />);

    // Simulate filling in the email and password fields
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Use findByText for asynchronous elements (if needed)
    const loginButton = await screen.findByRole('button', { name: /Login/i });

    // Simulate clicking the login button
    fireEvent.click(loginButton);

    // Check if alert is called with the correct message
    expect(global.alert).toHaveBeenCalledWith('You have successfully Logged In!');

    // Verify that input values are reset
    expect(screen.getByPlaceholderText('Email').value).toBe('');
    expect(screen.getByPlaceholderText('Password').value).toBe('');

    // Restore the original alert function
    global.alert = originalAlert;
  });
  test('renders login component', () => {
    render(<Login onSignupClick={() => {}} />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('input fields update on change', () => {
    render(<Login onSignupClick={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });
  
});


describe('Auth Component', () => {
  test('toggles between Signup and Login', async() => {
    render(<Auth />);

    // Initially, the Signup component should be rendered
    expect(screen.getByText('Sign-Up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('SignUp')).toBeInTheDocument();
    // Use findByText for asynchronous elements (if needed)
    const loginButton = await screen.findByRole('button', { name: /Login/i });

    // Simulate clicking the login button
    fireEvent.click(loginButton);
    // Check for fields unique to the Login component
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('SignUp')).toBeInTheDocument(); // Button to switch back to SignUp
  });
  test('switch to login view', () => {
    const onLoginClick = jest.fn();
    render(<Signup onLoginClick={onLoginClick} />);
  
    fireEvent.click(screen.getByText('Login'));
    expect(onLoginClick).toHaveBeenCalled();
  });
});