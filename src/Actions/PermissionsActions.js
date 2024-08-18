
export const FETCH_PERMISSIONS_REQUEST = 'FETCH_PERMISSIONS_REQUEST';
export const FETCH_PERMISSIONS_SUCCESS = 'FETCH_PERMISSIONS_SUCCESS';
export const FETCH_PERMISSIONS_FAILURE = 'FETCH_PERMISSIONS_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

import { API_ENDPOINT } from "../Config/APIs";
import AdminConfig from '../Config/index';
import http from "../Utils/Http";

// Action Creators
export const fetchPermissionsRequest = () => ({
    type: FETCH_PERMISSIONS_REQUEST
});

export const fetchPermissionsSuccess = (results, totalCount, totalPages, currentPage) => ({
    type: FETCH_PERMISSIONS_SUCCESS,
    payload: {
        results,
        totalCount,
        totalPages,
        currentPage
    }
});

export const fetchPermissionsFailure = error => ({
    type: FETCH_PERMISSIONS_FAILURE,
    payload: error
});

export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    payload: page
});

// Fetch Permissions Action
export const fetchPermissions = (name = '', page = 1, pageSize = 10) => {
    return dispatch => {
        dispatch(fetchPermissionsRequest());

        const url = new URL(`${API_ENDPOINT}/${AdminConfig.routes.permissions}`);

        if (name) {
            url.searchParams.append('search', name);
        }
        url.searchParams.append('page', page);
        url.searchParams.append('pageSize', pageSize);

        http.get(url.toString())
            .then(response => {
                const { results, totalCount, totalPages, currentPage } = response.data;
                dispatch(fetchPermissionsSuccess(results, totalCount, totalPages, currentPage));
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchPermissionsFailure(errorMsg));
            });
    };
};

// Add Permissions Action
export const addPermissions = (permissions) => {
    return async dispatch => {
        dispatch(fetchPermissionsRequest());
        try {
            await http.post(`${API_ENDPOINT}/${AdminConfig.routes.permissions}`, permissions);
            
            return Promise.resolve(); 
        } catch (error) {
            
            if (error.response && error.response.status === 409) {
                throw new Error("Duplicate entry"); 
            } else {
                throw error; 
            }
        }
    };
};


// Update Permissions Action
export const updatePermissions = (id, data) => {
    return dispatch => {
        dispatch(fetchPermissionsRequest());
        http.patch(`${API_ENDPOINT}/${AdminConfig.routes.permissions}/${id}`, data)
            .then(() => {
                dispatch(fetchPermissions());
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchPermissionsFailure(errorMsg));
            });
    };
};

// Delete Permissions Action
export const deletePermissions = (id) => {
    return dispatch => {
        dispatch(fetchPermissionsRequest());
        http.delete(`${API_ENDPOINT}/${AdminConfig.routes.permissions}/${id}`)
            .then(() => {
                dispatch(fetchPermissions()); // Refresh the permissions list
            })
            .catch(error => {
                const errorMsg = error.response?.data?.message || error.message;
                dispatch(fetchPermissionsFailure(errorMsg));
            });
    };
};
