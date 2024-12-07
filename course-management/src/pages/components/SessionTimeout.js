import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions';

const SessionTimeout = () => {
    const dispatch = useDispatch();
    const sessionExpiration = useSelector((state) => state.user.sessionExpiration);

    useEffect(() => {
        if (!sessionExpiration) return;

        const remainingTime = sessionExpiration - Date.now();

        if (remainingTime <= 0) {
            dispatch(logout());
            alert('Session expired. You have been logged out.');
            return;
        }

        const timeout = setTimeout(() => {
            dispatch(logout());
            alert('Session expired. You have been logged out.');
        }, remainingTime);

        return () => clearTimeout(timeout); // Clear timeout on component unmount or when sessionExpiration changes
    }, [sessionExpiration, dispatch]);

    return null; // This component doesn't render anything
};

export default SessionTimeout;
