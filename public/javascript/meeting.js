const Socket = io();
var mystream
var call
  var peer = new Peer({
	config: {'iceServers': [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
  { urls: 'stun:stun3.l.google.com:19302' },
  { urls: 'stun:stun4.l.google.com:19302' }
]}
  });
  var peerid;
 await peer.on('open', function(id) { peerid = id });

const getstream = async ({video = true,audio=true})=>{
const stream = await navigator.mediaDevices.getUserMedia({video,audio});
return stream;
};
const addremoteStream = (stream) => {
  const maindiv = document.querySelector('.maindiv');

  // Check if stream already exists
  const existing = [...maindiv.querySelectorAll('video')].find(
    (vid) => vid.srcObject && vid.srcObject.id === stream.id
  );
  if (existing) return; // Prevent duplicates

  const video = document.createElement('video');
  video.srcObject = stream;
  video.classList.add('w-full');
  video.autoplay = true;
  video.playsInline = true;
  maindiv.appendChild(video);
};

Socket.emit('join-me',{id:id});
Socket.on('enter',async ()=>{
  mystream = await getstream({video:true,audio:true});
 const video = document.querySelector('.mystream');
 video.srcObject = mystream;   
 video.play()
})

Socket.on('newmember',({socketid})=>{
    console.log('neewmemberallowed');
    Socket.emit('giveentry',{id:socketid,peer:peerid})
})


Socket.on('allowed',async (data)=>{
   console.log('theyneewmemberallowed');
 call = peer.call(data.peer,mystream);
  
 call.on('stream', (stream) => {
      console.log('2')
    addremoteStream(stream);
      });

})



peer.on('call',async function(call) {
	
	call.answer(mystream);
     call.on('stream', (stream) => {
        console.log('1')
        addremoteStream(stream);
      });
  });