 const io=require('socket.io')(8000)
 const users={};
 io.on('connection',socket=>{
     socket.on('new-user-joined',name=>{
        // console.log('New user',name)
         users[socket.id]=name;
         socket.braodcast.emit('user-joined',name);
     });
     socket.on('send',message=>{
         socket.braodcast.emit('receive',{message: message, name: users[socket.id]})
     });
     socket.on('disconnect',message=>{
        socket.braodcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
 })