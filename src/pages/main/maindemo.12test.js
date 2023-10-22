import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Indexpage from './main'; // 
import store from '../../store.js'; // 

describe('<Indexpage />', () => {
    const mockUser = {
        id: 5,
        company: { catchPhrase: "Test" },
        username: "TestUser"
    };

    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue([])
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('loads user data from localStorage', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);

        expect(localStorage.getItem).toHaveBeenCalledWith('user');
        
    });

    it('redirects to /auth if no user is in localStorage', () => {
        const history = createMemoryHistory();
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Indexpage />
                </Router>
            </Provider>
        );

        expect(history.location.pathname).toBe("/auth");
    });

    it('calculates followed user list correctly', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);
        await act(async () => {});
    });

    it('adds a user to followed list', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);

        const input = screen.getByRole('textbox', { name: /whatever_the_label_is/i }); 
        userEvent.type(input, 'UsernameToFollow');
        const addButton = screen.getByRole('button', { name: /add/i }); 
        userEvent.click(addButton);
    });

    it('filters the trends based on search input', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser));
        render(<Provider store={store}><Indexpage /></Provider>);

        const searchInput = screen.getByRole('textbox', { name: /search/i }); 
        userEvent.type(searchInput, 'SearchText');
    });
});
