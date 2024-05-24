module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('message', (data) => {
            console.log('Message received:', data);
            // Broadcast the message to other users
            io.emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
