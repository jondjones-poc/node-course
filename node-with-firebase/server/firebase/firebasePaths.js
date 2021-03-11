const getSessionRoute = (userId, sessionId) => {
    return `users/${userId}/${sessionId}`;
};

const getUserRoute = (userId) => {
    return `users/${userId}/`;
};

const getAllRoute = () => {
    return `users/`;
};

module.exports = { getSessionRoute, getUserRoute, getAllRoute };