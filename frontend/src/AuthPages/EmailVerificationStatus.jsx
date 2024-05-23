import React, { useEffect, useState } from 'react';
import axiosClient from '../ApiConnection/axiosClient';
import { useStateContext } from '../contexts/contextprovider';

export default function EmailVerified({ children }) {
    const { token } = useStateContext();
    const [isEmailVerified, setIsEmailVerified] = useState(null);

    useEffect(() => {
        const fetchEmailVerificationStatus = async () => {
            try {
                const response = await axiosClient.get("/user/email-verified", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsEmailVerified(response.data);
            } catch (error) {
                console.error("Error fetching email verification status:", error);
                setIsEmailVerified(false); // Set as false by default if error occurs
            }
        };

        if (token) {
            fetchEmailVerificationStatus();
        }
    }, [token]);

    // Return null if email verification status is not yet fetched
    if (isEmailVerified === null) {
        return null;
    }

    // Return children components if email is verified
    if (isEmailVerified) {
        return children;
    }

    // Return email verification message if email is not verified
    return (
        <div>
            <p>Your email is not verified. Please verify your email.</p>
            {/* You can render a button or link to trigger the email verification process */}
        </div>
    );
}
