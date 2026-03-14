// Step 1: Load Socket.IO
const script = document.createElement('script');
script.src = 'https://cdn.socket.io/4.5.4/socket.io.min.js';
script.onload = () => {
    console.log('✅ Socket.IO loaded! Now run: connectToNotifications()');
    
    // Make connection function available globally
    window.connectToNotifications = function(userId = 'b92ac1e3-3e3f-4c4d-ac56-13709d5429b3') {
        console.log(`🔌 Connecting as user: ${userId}`);
        
        window.notificationSocket = io('http://localhost:3000/notifications', {
            query: { userId: userId }
        });

        const socket = window.notificationSocket;

        socket.on('connect', () => {
            console.log('%c✅ CONNECTED!', 'color: green; font-size: 16px; font-weight: bold');
            console.log('Socket ID:', socket.id);
            console.log('User ID:', userId);
            console.log('\n📝 Available commands:');
            console.log('  - getUnreadCount()');
            console.log('  - markAsRead("notification-id")');
            console.log('  - disconnectSocket()');
            console.log('  - reconnectSocket()');
        });

        socket.on('disconnect', () => {
            console.log('%c❌ DISCONNECTED', 'color: red; font-size: 16px; font-weight: bold');
        });

        socket.on('notification', (notification) => {
            console.log('%c🔔 NEW NOTIFICATION', 'color: blue; font-size: 14px; font-weight: bold');
            console.table(notification);
            console.log('Full data:', notification);
        });

        socket.on('notificationRead', (data) => {
            console.log('%c✅ Notification Read', 'color: green; font-size: 12px');
            console.log(data);
        });

        socket.on('unreadCount', (data) => {
            console.log('%c📊 Unread Count: ' + data.count, 'color: orange; font-size: 14px; font-weight: bold');
        });

        socket.on('error', (error) => {
            console.error('%c❌ ERROR', 'color: red; font-size: 14px; font-weight: bold');
            console.error(error);
        });

        socket.on('connect_error', (error) => {
            console.error('%c❌ CONNECTION ERROR', 'color: red; font-size: 14px; font-weight: bold');
            console.error(error.message);
        });
    };

    // Helper functions
    window.getUnreadCount = function() {
        if (!window.notificationSocket) {
            console.error('❌ Not connected! Run: connectToNotifications()');
            return;
        }
        window.notificationSocket.emit('getUnreadCount');
    };

    window.markAsRead = function(notificationId) {
        if (!window.notificationSocket) {
            console.error('❌ Not connected! Run: connectToNotifications()');
            return;
        }
        if (!notificationId) {
            console.error('❌ Please provide notification ID: markAsRead("your-id")');
            return;
        }
        window.notificationSocket.emit('markAsRead', { notificationId });
    };

    window.disconnectSocket = function() {
        if (window.notificationSocket) {
            window.notificationSocket.disconnect();
            console.log('👋 Disconnected');
        }
    };

    window.reconnectSocket = function() {
        if (window.notificationSocket) {
            window.notificationSocket.connect();
            console.log('🔌 Reconnecting...');
        }
    };

    // Also create a function to send test notification via REST
    window.sendTestNotification = async function(userId = 'test-user-123') {
        try {
            const response = await fetch('http://localhost:3000/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    type: 'info',
                    title: 'Test from Console',
                    message: 'This notification was sent from browser console!',
                    data: {
                        source: 'browser-console',
                        timestamp: new Date().toISOString()
                    }
                })
            });
            const data = await response.json();
            console.log('✅ Notification sent successfully:', data);
        } catch (error) {
            console.error('❌ Error sending notification:', error);
        }
    };

    console.log('\n🎉 Ready! Now run: connectToNotifications("your-user-id")');
};
document.head.appendChild(script);