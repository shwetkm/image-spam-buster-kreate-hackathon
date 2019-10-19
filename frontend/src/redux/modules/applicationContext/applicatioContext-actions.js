export const UPDATE_APPLICATION_CONTEXT_MODEL = '@@applicationContext/UPDATE_APPLICATION_CONTEXT_MODEL';

export const updateApplicationContextAction = (property, value) => ({
    type: UPDATE_APPLICATION_CONTEXT_MODEL,
    property,
    value,
});