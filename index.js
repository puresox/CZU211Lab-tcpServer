import { createServer } from 'net';

const sockets = {
  unity: null,
  brain: null,
  doctor: null,
};

const server = createServer((socket) => {
  // 监听数据
  socket.on('data', (data) => {
    switch (data.type) {
      case 'auth':
        // eslint-disable-next-line no-param-reassign
        socket.name = data.data;
        sockets[socket.name] = socket;
        break;
      case 'attentionData':
        if (sockets.unity && sockets.unity.writable) {
          // eslint-disable-next-line no-eval
          const decimalData = eval(`0x${data.data}`).toString();
          sockets.unity.write({
            type: 'attentionData',
            data: decimalData,
          });
        }
        break;
      case 'controllData':
        if (sockets.unity && sockets.unity.writable) {
          sockets.unity.write(data);
        }
        break;
      default:
        break;
    }
  });
  // 监听对方断开连接
  socket.on('end', () => {
    sockets[socket.name] = null;
    console.log(`${socket.name}断开连接`);
  });
  // 监听双方断开连接
  socket.on('close', () => {
    console.log('双方连接断开');
  });
  // console.log('连接建立');
  // socket.write('hello');
  // console.log('我方发送hello');
  // socket.end('goodbye');
  // console.log('我方断开连接');
}).on('error', (err) => {
  // Handle errors here.
  throw err;
});

// 监听127.0.0.1:3000，最大连接数为3
server.listen(3000, '127.0.0.1', 3, () => {
  console.log('opened server on', server.address());
});
