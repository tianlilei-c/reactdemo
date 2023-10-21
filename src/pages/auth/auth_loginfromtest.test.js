import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';

import Login from './auth copy'; 

const mockStore = configureStore([]);

describe('<Login />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userdata: [],
    });
    store.dispatch = jest.fn();
  });

  it('should set login state after successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ username: 'testUser', address: { street: 'testStreet' } }]),
      })
    );

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    userEvent.type(getByPlaceholderText('Your account name'), 'testUser');
    userEvent.type(getByPlaceholderText('Password'), 'testStreet');
    fireEvent.click(getByText('SIGN IN'));
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith({
        type: 'LOGIN_DATA',
        payload: { username: 'testUser', address: { street: 'testStreet' } },
      });
    });
  });
  it('should set error state for invalid user login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    userEvent.type(getByPlaceholderText('Your account name'), 'wrongUser');
    userEvent.type(getByPlaceholderText('Password'), 'wrongPassword');
    fireEvent.click(getByText('SIGN IN'));
    await waitFor(() => {
      expect(store.dispatch).not.toHaveBeenCalledWith({
        type: 'LOGIN_DATA',
        payload: expect.anything(),
      });
    });
  });
});
