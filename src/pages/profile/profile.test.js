import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
const history = createMemoryHistory();
const pushSpy = jest.spyOn(history, 'push');

import Profile from './profile_copy.js';
const mockStore = configureStore([]);
describe('<Profile />', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      logindata: { username: 'testUser', email: 'testUser@test.com', phone: '123-456-7890', address: { street: 'testStreet', zipcode: '12345' } },
    });
    store.dispatch = jest.fn();
    fetchMock.resetMocks();

  });

  afterEach(() => {
    localStorage.removeItem('user');
  });

  it('Verify the username of the logged in user', () => {
    // 模拟用户已登录
    const user = { username: 'testUser', email: 'testUser@test.com', phone: '123-456-7890', address: { street: 'testStreet', zipcode: '12345' } };
    localStorage.setItem('user', JSON.stringify(user));
    fetchMock.mockResponse(JSON.stringify({}));
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );

    // 验证 accountname 输入框的 placeholder 是否为预设的用户名
    expect(getByPlaceholderText('testUser')).toBeInTheDocument();
  });

  it('User no logined', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Profile />
        </Router>
      </Provider>
    );

    // 等待 pushSpy 被调用
    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith('/auth');
    });
    fetchMock.mockResponse(JSON.stringify({}));
  });
});
