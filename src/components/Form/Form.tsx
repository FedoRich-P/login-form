import  { useState } from 'react';
import { Button, Container } from '@mui/material';
import {useFetchMeQuery} from "../../model/apiSlice.tsx";
import {Profile} from "../Profile/Profile.tsx";
import {AuthModal} from "../AuthModal/AuthModal.tsx";


export const Form = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const { data: user, isLoading } = useFetchMeQuery();

    const handleOpenAuthModal = () => setAuthModalOpen(true);
    const handleCloseAuthModal = () => setAuthModalOpen(false);

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <Container>
            {user ? (
                <Profile />
            ) : (
                <Button variant="contained" onClick={handleOpenAuthModal}>
                    Войти
                </Button>
            )}
            <AuthModal open={authModalOpen} onClose={handleCloseAuthModal} />
        </Container>
    );
};