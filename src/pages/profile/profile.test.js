import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from 'redux';
import Profile from './profile.js';

const mockStore = configureStore(jest.fn());

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe('Profile component', () => {
  test('renders Profile component', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    expect(screen.getByText('New Info')).toBeInTheDocument();
  });

  test('email input accepts text', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('Your e-mail address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  test('phone input accepts text', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    const phoneInput = screen.getByPlaceholderText('Phone:123-123-1234');
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
    expect(phoneInput.value).toBe('123-456-7890');
  });

  test('zipcode input accepts text', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    const zipcodeInput = screen.getByPlaceholderText('Valid five-digit zip code');
    fireEvent.change(zipcodeInput, { target: { value: '12345' } });
    expect(zipcodeInput.value).toBe('12345');
  });

  test('password input accepts text', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('password confirmation input accepts text', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    const passwordConfirmationInput = screen.getByPlaceholderText('Password confirmation');
    fireEvent.change(passwordConfirmationInput, { target: { value: 'password123' } });
    expect(passwordConfirmationInput.value).toBe('password123');
  });

  test('useEffect logic', () => {
    const history = createMemoryHistory();
    const user = { username: 'john_doe', email: 'john.doe@example.com' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(user));

    const store = createStore(() => ({ logindata: {} }));

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'LOGIN_DATA', payload: user });
    expect(history.location.pathname).not.toBe('/auth');
  });

  test('useEffect logic with no user', () => {
    const history = createMemoryHistory();
    Storage.prototype.getItem = jest.fn(() => null);
    const store = createStore(() => ({ logindata: {} }));
    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    expect(localStorage.getItem).toHaveBeenCalledWith('user');

    expect(mockDispatch).not.toHaveBeenCalled();

    expect(history.location.pathname).toBe('/auth');
  });

  test('Clean button clears the form', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    const cleanButton = screen.getByText('Clean');
    fireEvent.click(cleanButton);
    const emailInput = screen.getByPlaceholderText('Your e-mail address');
    expect(emailInput.value).toBe('');
  });

  test('Update button triggers form submission', () => {
    render(
      <Provider store={mockStore}>
        <Profile />
      </Provider>
    );
    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);
  });
});
