import reducer from './auth';
import * as actionTYpes from '../actions/actionTypes'
import { idText } from 'typescript';
import { exportAllDeclaration } from '@babel/types';

describe('Auth Reducer', ()=> {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null, 
            userId: null, 
            error: null, 
            loading: false, 
            authRedirectPath: '/'
        })
    })

    it('should store token upon login', ()=> {
        expect(reducer({
            token: null, 
            userId: null, 
            error: null, 
            loading: false, 
            authRedirectPath: '/'
        }, {
            type: actionTYpes.AUTH_SUCCESS,
            idToken:'some-token', 
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token', 
            userId: 'some-user-id',
            error: null, 
            loading: false, 
            authRedirectPath: '/'
        })
    })
})