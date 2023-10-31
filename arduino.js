// Import required libraries
import { SerialPort } from 'serialport';
const socketIO = require('socket.io');

const protocoloConfiguration = {
    path: 'COM3',
    baudRate: 9600
}

SerialPort.list().then(
    ports => ports.forEach(ports => console.log(ports.path)),
    err => console.error(err)

); 

// Define button pin numbers
const buttonUpPin = 2;
const buttonDownPin = 3;
const buttonLeftPin = 4;
const buttonRightPin = 5;
const fireButtonPin = 6;

// Create serial port connection
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

// Listen for incoming data from the serial port
parser.on('data', (data) => {
    // Parse the data and emit the corresponding button press event to the client
    switch (data) {
        case 'Up button pressed':
            io.emit('buttonPress', 'up');
            break;
        case 'Down button pressed':
            io.emit('buttonPress', 'down');
            break;
        case 'Left button pressed':
            io.emit('buttonPress', 'left');
            break;
        case 'Right button pressed':
            io.emit('buttonPress', 'right');
            break;
        case 'Fire button pressed':
            io.emit('buttonPress', 'fire');
            break;
        default:
            break;
    }
});

// Listen for incoming socket connections
io.on('connection', (socket) => {
    console.log('Client connected');

    // Listen for incoming button press events from the client
    socket.on('buttonPress', (button) => {
        // Send the corresponding command to the Arduino over the serial port
        switch (button) {
            case 'up':
                port.write('Up button pressed\r\n');
                break;
            case 'down':
                port.write('Down button pressed\r\n');
                break;
            case 'left':
                port.write('Left button pressed\r\n');
                break;
            case 'right':
                port.write('Right button pressed\r\n');
                break;
            case 'fire':
                port.write('Fire button pressed\r\n');
                break;
            default:
                break;
        }
    });
});
