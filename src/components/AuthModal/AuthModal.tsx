import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
    Modal,
    Box,
    TextField,
    Button,
    Tabs,
    Tab,
    Alert,
} from '@mui/material';
import {useLoginMutation, useRegisterUserMutation} from "../../model/apiSlice.tsx";
import {AuthFormInputs, AuthModalProps} from "./authTypes.ts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const AuthModal = ({ open, onClose }:AuthModalProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const { register, handleSubmit, reset } = useForm<AuthFormInputs>();
    const [login] = useLoginMutation();
    const [registerUser] = useRegisterUserMutation();

    const onSubmit: SubmitHandler<AuthFormInputs> = async (data) => {
        setError(null);
        try {
            if (activeTab === 0) {
                await login(data).unwrap();
            } else {
                await registerUser(data).unwrap();
            }
            onClose();
            reset();
        } catch (err) {
            setError('Ошибка при выполнении запроса');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
                    <Tab label="Вход" />
                    <Tab label="Регистрация" />
                </Tabs>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Имя пользователя"
                        margin="normal"
                        {...register('username', { required: true })}
                    />
                    <TextField
                        fullWidth
                        label="Пароль"
                        type="password"
                        margin="normal"
                        {...register('password', { required: true })}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                        {activeTab === 0 ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};