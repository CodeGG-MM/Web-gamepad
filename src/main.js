const gamepad = document.querySelector('.gamepad');
    const buttons = gamepad.querySelectorAll('.button');
    const playerJoystick = document.getElementById('player-joystick');
    const cameraJoystick = document.getElementById('camera-joystick');
    const playerHandle = playerJoystick.querySelector('.handle');
    const cameraHandle = cameraJoystick.querySelector('.handle');
    
    const ws = new WebSocket('ws://<ANDROID_TV_IP>:8080');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };
    
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    buttons.forEach(button => {
      button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        const action = button.getAttribute('data-action');
        sendInput(action, 'down');
      });
      button.addEventListener('touchend', (event) => {
        event.preventDefault();
        const action = button.getAttribute('data-action');
        sendInput(action, 'up');
      });
      button.addEventListener('mousedown', (event) => {
        const action = button.getAttribute('data-action');
        sendInput(action, 'down');
      });
      button.addEventListener('mouseup', (event) => {
        const action = button.getAttribute('data-action');
        sendInput(action, 'up');
      });
    });
    
    let playerJoystickActive = false;
    let playerJoystickStartX, playerJoystickStartY;
    let cameraJoystickActive = false;
    let cameraJoystickStartX, cameraJoystickStartY;
    
    playerJoystick.addEventListener('touchstart', (event) => {
      event.preventDefault();
      playerJoystickActive = true;
      playerJoystickStartX = event.touches[0].clientX;
      playerJoystickStartY = event.touches[0].clientY;
    });
    
    playerJoystick.addEventListener('touchmove', (event) => {
      if (!playerJoystickActive) return;
      event.preventDefault();
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
      const deltaX = touchX - playerJoystickStartX;
      const deltaY = touchY - playerJoystickStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = playerJoystick.offsetWidth / 2 - playerHandle.offsetWidth / 2;
      
      let constrainedDeltaX = deltaX;
      let constrainedDeltaY = deltaY;
      
      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        constrainedDeltaX = maxDistance * Math.cos(angle);
        constrainedDeltaY = maxDistance * Math.sin(angle);
      }
      
      playerHandle.style.transform = `translate(${constrainedDeltaX}px, ${constrainedDeltaY}px)`;
      
      const normalizedX = constrainedDeltaX / maxDistance;
      const normalizedY = constrainedDeltaY / maxDistance;
      sendJoystickInput('player', normalizedX, normalizedY);
    });
    
    playerJoystick.addEventListener('touchend', (event) => {
      event.preventDefault();
      playerJoystickActive = false;
      playerHandle.style.transform = 'translate(-50%, -50%)';
      sendJoystickInput('player', 0, 0);
    });
    
    playerJoystick.addEventListener('mousedown', (event) => {
      event.preventDefault();
      playerJoystickActive = true;
      playerJoystickStartX = event.clientX;
      playerJoystickStartY = event.clientY;
    });
    
    playerJoystick.addEventListener('mousemove', (event) => {
      if (!playerJoystickActive) return;
      event.preventDefault();
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const deltaX = mouseX - playerJoystickStartX;
      const deltaY = mouseY - playerJoystickStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = playerJoystick.offsetWidth / 2 - playerHandle.offsetWidth / 2;
      
      let constrainedDeltaX = deltaX;
      let constrainedDeltaY = deltaY;
      
      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        constrainedDeltaX = maxDistance * Math.cos(angle);
        constrainedDeltaY = maxDistance * Math.sin(angle);
      }
      
      playerHandle.style.transform = `translate(${constrainedDeltaX}px, ${constrainedDeltaY}px)`;
      
      const normalizedX = constrainedDeltaX / maxDistance;
      const normalizedY = constrainedDeltaY / maxDistance;
      sendJoystickInput('player', normalizedX, normalizedY);
    });
    
    playerJoystick.addEventListener('mouseup', (event) => {
      event.preventDefault();
      playerJoystickActive = false;
      playerHandle.style.transform = 'translate(-50%, -50%)';
      sendJoystickInput('player', 0, 0);
    });
    
    cameraJoystick.addEventListener('touchstart', (event) => {
      event.preventDefault();
      cameraJoystickActive = true;
      cameraJoystickStartX = event.touches[0].clientX;
      cameraJoystickStartY = event.touches[0].clientY;
    });
    
    cameraJoystick.addEventListener('touchmove', (event) => {
      if (!cameraJoystickActive) return;
      event.preventDefault();
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;
      const deltaX = touchX - cameraJoystickStartX;
      const deltaY = touchY - cameraJoystickStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = cameraJoystick.offsetWidth / 2 - cameraHandle.offsetWidth / 2;
      
      let constrainedDeltaX = deltaX;
      let constrainedDeltaY = deltaY;
      
      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        constrainedDeltaX = maxDistance * Math.cos(angle);
        constrainedDeltaY = maxDistance * Math.sin(angle);
      }
      
      cameraHandle.style.transform = `translate(${constrainedDeltaX}px, ${constrainedDeltaY}px)`;
      
      const normalizedX = constrainedDeltaX / maxDistance;
      const normalizedY = constrainedDeltaY / maxDistance;
      sendJoystickInput('camera', normalizedX, normalizedY);
    });
    
    cameraJoystick.addEventListener('touchend', (event) => {
      event.preventDefault();
      cameraJoystickActive = false;
      cameraHandle.style.transform = 'translate(-50%, -50%)';
      sendJoystickInput('camera', 0, 0);
    });
    
    cameraJoystick.addEventListener('mousedown', (event) => {
      event.preventDefault();
      cameraJoystickActive = true;
      cameraJoystickStartX = event.clientX;
      cameraJoystickStartY = event.clientY;
    });
    
    cameraJoystick.addEventListener('mousemove', (event) => {
      if (!cameraJoystickActive) return;
      event.preventDefault();
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const deltaX = mouseX - cameraJoystickStartX;
      const deltaY = mouseY - cameraJoystickStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = cameraJoystick.offsetWidth / 2 - cameraHandle.offsetWidth / 2;
      
      let constrainedDeltaX = deltaX;
      let constrainedDeltaY = deltaY;
      
      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        constrainedDeltaX = maxDistance * Math.cos(angle);
        constrainedDeltaY = maxDistance * Math.sin(angle);
      }
      
      cameraHandle.style.transform = `translate(${constrainedDeltaX}px, ${constrainedDeltaY}px)`;
      
      const normalizedX = constrainedDeltaX / maxDistance;
      const normalizedY = constrainedDeltaY / maxDistance;
      sendJoystickInput('camera', normalizedX, normalizedY);
    });
    
    cameraJoystick.addEventListener('mouseup', (event) => {
      event.preventDefault();
      cameraJoystickActive = false;
      cameraHandle.style.transform = 'translate(-50%, -50%)';
      sendJoystickInput('camera', 0, 0);
    });
    
    function sendInput(action, state) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action, state }));
      } else {
        console.log('WebSocket is not open. Cannot send input.');
      }
    }
    
    function sendJoystickInput(type, x, y) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'joystick', type, x, y }));
      } else {
        console.log('WebSocket is not open. Cannot send joystick input.');
      }
    }
