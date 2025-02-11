import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useFetchMeQuery, useLogoutMutation} from "../../model/apiSlice.tsx";

export const Profile = () => {
    const { data: user, isLoading } = useFetchMeQuery();
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout().unwrap();
        navigate('/login');
    };

    if (isLoading) return <CircularProgress />;

    return (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4">Привет, {user?.username}!</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
                Выйти
            </Button>
        </Box>
    );
};