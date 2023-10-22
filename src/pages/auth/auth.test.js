import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom'; // 导入MemoryRouter

import Login from './auth copy';

const mockStore = configureStore([]);

describe('<Login />', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      userdata: [{ username: 'testUser', address: { street: 'testStreet' } }],
      logindata: { username: 'testUser', address: { street: 'testStreet' } },
    });
    store.dispatch = jest.fn();
    fetchMock.resetMocks();

    // 模拟用户已登录
    const user = { username: 'testUser', email: 'testUser@test.com', phone: '123-456-7890', address: { street: 'testStreet', zipcode: '12345' } };
    localStorage.setItem('user', JSON.stringify(user));
  });

  afterEach(() => {
    localStorage.removeItem('user');
  });


  it('User should be logged off', async () => {
    fetchMock.mockResponse(JSON.stringify({}));
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    await waitFor(() => {
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  it('should set login state after successful login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ username: 'testUser', address: { street: 'testStreet' } }]),
      })
    );
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    const accountNameInput = getByPlaceholderText('Your account name');
    const passwordInput = getByPlaceholderText('Password');
    const loginbtnsubmit = getByText('SIGN IN');
    fireEvent.change(accountNameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testStreet' } });
    fireEvent.click(loginbtnsubmit)
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
    const accountNameInput = getByPlaceholderText('Your account name');
    const passwordInput = getByPlaceholderText('Password');
    const loginbtnsubmit = getByText('SIGN IN');
    fireEvent.change(accountNameInput, { target: { value: 'erroruser' } });
    fireEvent.change(passwordInput, { target: { value: 'errorpassword' } });
    fireEvent.click(loginbtnsubmit)
    await waitFor(() => {
      expect(store.dispatch).not.toHaveBeenCalledWith({
        type: 'LOGIN_DATA',
        payload: expect.anything(),
      });
    });
  });
});
