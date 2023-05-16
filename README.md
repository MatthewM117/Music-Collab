# Music-Collab
A simple DAW where you can create music with other people in real-time!

Hosted at https://music-collab-api.onrender.com/

Created with ReactJS and node.js, express, and socket.io.

# How to Use
Simply click the link above, type in a username, and join a room! The room number can be anything you want. If other people want to join your room, all they have to do is type in the same room number that you did. You will see messages in the chat when people join/leave, as well as when you join a room. (The program will still work if you are not in a room).

# Features
- Piano roll: Left click to place a note, right-click to remove a note. The note you placed/removed will be updated for everyone in the room.
- Play song: Press the spacebar to play the notes you placed! This will move the red bar along your piano roll at a speed calculated based on your BPM. (Playing the song will not play the song for everyone in the room).
- Reset: The reset button will erase all the notes for everyone in the room.
- BPM: Choose the BPM by changing the number value in the "BPM" text field. This updates for everyone in the room, as well as alerts the entire room in the chat whenever the BPM value is changed. Raise/lower the BPM to make your song faster/slower.
- Chat: On the right-hand side there is a chat window, where users can send messages to everyone in the room. The server will also send messages on certain events such as a user joining/leaving, and BPM updates.

# Limitations
This is just a simple piano roll for brainstorming song ideas with others. It is not meant to be used to create final products of songs. The purpose of this is to create basic melodies with others, and then once you find a melody you like, transfer it into an actual DAW such as FL Studio. As such, this program only features a basic piano roll with an adjustable bpm, and no save functionality. Also, the sustain of the notes cannot be changed.

# Note:
This is the main repo for this project, however it is not where the production build is held. The final build of this project can be found at https://github.com/MatthewM117/music-collab-backend which is the repo I use to host the website instead of this one due to technical limitations regarding hosting a reactJS website with a node.js backend.
