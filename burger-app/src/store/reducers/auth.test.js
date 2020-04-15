import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Test reducer managing auth', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login',() => {
        expect(reducer({            
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'}
            ,{type: actionTypes.AUTH_SUCCESS,
                idToken: 'test-token',
                userId: 'test-id',
                error: null,
                loading: false
            })).toEqual({
                token: 'test-token',
                userId: 'test-id',
                error: null,
                loading: false,
                authRedirectPath: '/'

        });
    });
});
