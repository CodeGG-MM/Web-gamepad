const WebSocket = require('ws');
    const wss = new WebSocket.Server({ port: 8080 });
    
    wss.on('connection', ws => {
      console.log('Client connected');
    
      ws.on('message', message => {
        try {
          const data = JSON.parse(message);
          console.log('Received:', data);
          // Simulate gamepad input here using Android KeyEvents or a virtual controller library
          // Example:
          // if (data.action === 'up' && data.state === 'down') {
          //   // Simulate KeyEvent.KEYCODE_DPAD_UP
          // }
          // if (data.action === 'joystick' && data.type === 'player') {
          //   console.log('Player Joystick:', data.x, data.y);
          // }
          // if (data.action === 'joystick' && data.type === 'camera') {
          //    console.log('Camera Joystick:', data.x, data.y);
          // }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
    
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    
      ws.on('error', error => {
        console.error('WebSocket error:', error);
      });
    });
    
    console.log('WebSocket server started on port 8080');
