import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';


@WebSocketGateway({
  cors: {
    origin: '*', // Configure this based on frontend URL
  },
  namespace: '/notifications',
})
@Injectable()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private userSockets: Map<string, Set<string>> = new Map(); // userId -> Set of socket IDs

  constructor(private notificationService: NotificationService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    
    // Extract userId from query params or JWT token
    const userId = client.handshake.query.userId as string;
    
    if (userId) {
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, new Set());
      }
      this.userSockets.get(userId).add(client.id);
      
      // Join user to their personal room
      client.join(`user:${userId}`);
      this.logger.log(`User ${userId} joined with socket ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    
    // Remove socket from userSockets map
    for (const [userId, sockets] of this.userSockets.entries()) {
      if (sockets.has(client.id)) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.userSockets.delete(userId);
        }
        break;
      }
    }
  }

  // Send notification to specific user
  async sendToUser(userId: string, notification: any) {
    this.logger.log(`Sending notification to user ${userId}`);
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  // Send notification to multiple users
  async sendToUsers(userIds: string[], notification: any) {
    userIds.forEach(userId => {
      this.server.to(`user:${userId}`).emit('notification', notification);
    });
  }

  // Broadcast to all connected clients
  broadcastNotification(notification: any) {
    this.server.emit('notification', notification);
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() data: { notificationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.handshake.query.userId as string;
    
    try {
      await this.notificationService.markAsRead(data.notificationId, userId);
      client.emit('notificationRead', { notificationId: data.notificationId });
    } catch (error) {
      this.logger.error(`Error marking notification as read: ${error.message}`);
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('getUnreadCount')
  async handleGetUnreadCount(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.query.userId as string;
    
    try {
      const result = await this.notificationService.getUnreadCount(userId);
      client.emit('unreadCount', result);
    } catch (error) {
      this.logger.error(`Error getting unread count: ${error.message}`);
      client.emit('error', { message: error.message });
    }
  }
}