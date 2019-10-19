export const CREATE_ACCOUNT_EXPENSE_REQUEST = '@@accountExpense/CREATE_ACCOUNT_EXPENSE_REQUEST';
export const CREATE_ACCOUNT_EXPENSE_FAILURE = '@@accountExpense/CREATE_ACCOUNT_EXPENSE_FAILURE';
export const CREATE_ACCOUNT_EXPENSE_SUCCESS = '@@accountExpense/CREATE_ACCOUNT_EXPENSE_SUCCESS';

export const FETCH_ACCOUNT_EXPENSE_REQUEST = '@@accountExpense/FETCH_ACCOUNT_EXPENSE_REQUEST';
export const FETCH_ACCOUNT_EXPENSE_FAILURE = '@@accountExpense/FETCH_ACCOUNT_EXPENSE_FAILURE';
export const FETCH_ACCOUNT_EXPENSE_SUCCESS = '@@accountExpense/FETCH_ACCOUNT_EXPENSE_SUCCESS';

export const CLEAR_SELECTED_ACCOUNT_EXPENSE = '@@accountExpense/CLEAR_SELECTED_ACCOUNT_EXPENSE';

export const createAccountExpenseRequest = (payload, successCallback, failureCallBack) => ({
    type: CREATE_ACCOUNT_EXPENSE_REQUEST,
    payload,
    successCallback,
    failureCallBack,
});

export const fetchAccountExpenseRequest = () => ({
    type: FETCH_ACCOUNT_EXPENSE_REQUEST,
});

export const fetchAccountExpenseRequestById = () => ({
    type: FETCH_ACCOUNT_EXPENSE_REQUEST,
});

export const clearSelectedExpenseInvoice = () => ({
    type: CLEAR_SELECTED_ACCOUNT_EXPENSE,
});
