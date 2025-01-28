# Web-Based Gamepad
    
    This project provides a web-based gamepad that can be used to control an Android TV.
    
    ## Setup
    
    ### Frontend (Web App)
    
    1.  Open the `index.html` file in a web browser on your phone.
    2.  Make sure your phone and Android TV are connected to the same Wi-Fi network.
    3.  **Find your Android TV's IP address:**
        - Go to your Android TV's settings.
        - Navigate to "Network & Internet" or a similar option.
        - Select your Wi-Fi network.
        - Look for the "IP address" information.
    4.  Replace `<ANDROID_TV_IP>` in `src/main.js` with the actual IP address of your Android TV.
    
    ### Backend (Android TV)
    
    1.  **Install Node.js on your Android TV:**
        - You may need to use a terminal emulator app like "Termux" from the Google Play Store.
        - Open Termux and run the following commands:
          ```bash
          pkg update
          pkg install nodejs
          ```
    2.  Copy the `server.js` file to your Android TV. You can use `adb push` or a file explorer app.
    3.  Open Termux and navigate to the directory where you saved `server.js` using the `cd` command.
    4.  Run the server using the command: `node server.js`
    5.  The server will start listening for WebSocket connections on port 8080.
    
    ## Usage
    
    1.  Open the web app on your phone.
    2.  The web app will connect to the server running on your Android TV.
    3.  Use the virtual gamepad on your phone to send input commands to the Android TV.
    4.  Use the left joystick for player movement and the right joystick for camera control.
    
    ## Notes
    
    -   This is a basic implementation and may require further adjustments to simulate gamepad inputs on Android TV.
    -   You may need to install a WebSocket library on your Android TV if it's not already available.
    -   The server.js file contains comments on how to simulate gamepad inputs using Android KeyEvents or a virtual controller library.
