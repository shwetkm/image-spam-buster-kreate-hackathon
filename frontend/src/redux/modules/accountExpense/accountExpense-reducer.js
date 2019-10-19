/**
 * Created by vinay on 19/12/18.
 */
import initialStates from '../../initialStates';
import { CLEAR_SELECTED_ACCOUNT_EXPENSE, FETCH_ACCOUNT_EXPENSE_SUCCESS } from './accountExpense-actions';

const accountExpenseReducer = (state = initialStates.accountExpense, action) => {
    let newState = {};
    switch (action.type) {
    case FETCH_ACCOUNT_EXPENSE_SUCCESS:
        newState = Object.assign({}, state, {
            selectedExpense: action.data,
        });
        break;
    case CLEAR_SELECTED_ACCOUNT_EXPENSE:
        newState = Object.assign({}, state, { selectedExpense: {} });
        break;
    default:
        newState = state;
    }
    return newState;
};

export default accountExpenseReducer;
