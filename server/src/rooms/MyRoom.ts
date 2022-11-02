import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";
import { allPlayers, saveAllPlayers } from './MyRoomData'
import mongoose from "mongoose";
import PlayerModel from "./model/Player";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState(8, allPlayers));
    //this.setState(new MyRoomState());

    this.onMessage('pickColor', (client, message) => {
      const player = this.state.players.get(client.sessionId)
      player.color = message.color
      this.broadcast("flashColor", {color: message.color})
      //this.send(client, "flashColor", {color: message.color})
      console.log(player.name, ' picked color ', message.color)
    })

    this.onMessage('setColor', (client, message) => {
      const player = this.state.players.get(client.sessionId) 
      this.state.cubes.forEach((cube)=>{
        if(cube.id == message.id){
          cube.color = player.color
        }
      })
      console.log(player.name, ' changed ', message.id, " to ", player.color)
    })

  }

  onJoin (client: Client, options: any) {
 
    const newPlayer = new Player(
      client.id,
      options.userData.displayName || 'Anonymous'
    )
    this.state.players.set(client.sessionId, newPlayer)
    this.state.allPlayers.set(client.sessionId, newPlayer)
    console.log(newPlayer.name, 'joined! => ', options.userData)
    //console.log('Client: ', client)
    console.log('-------------------------------------------------')
    console.log('----ALL PLAYERS----')
    //Array.from(this.state.allPlayers.values()).map((player: any, i: number) => `${i+1}. ${player.id} ${player.name} ${player.color}`)
    Array.from(this.state.allPlayers.values()).forEach((player: any, i: number) => console.log(`${i+1}. ${player.id} ${player.name} ${player.color}`))
    console.log('-------------------------------------------------')
    this.saveToMongo(options.userData)

  }

  onLeave (client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId)
    console.log(player.name, 'left!')
    console.log(client.sessionId, "left!")

    this.state.players.delete(client.sessionId)
    //eğer delete etmezsek de odada kimse kalmayınca dispose olur mu? Evet bence yine de dispose olur. Çünkü dispose olması için bir logic yazmıyoruz.
    //demekki bağlı client kalmayınca kendisi dispose ediyor.
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
    saveAllPlayers(this.state.allPlayers)
    /* console.log('----SAVING ALL PLAYERS----')
    Array.from(this.state.allPlayers.values()).forEach((player: any, i: number) => console.log(`${i+1}. ${player.id} ${player.name} ${player.color}`))
    console.log('--------------------------')
    saveAllPlayers(this.state.allPlayers)
    console.log('----SAVED ALL PLAYERS----')
    Array.from(allPlayers.values()).forEach((player: any, i: number) => console.log(`${i+1}. ${player.id} ${player.name} ${player.color}`))
    console.log('--------------------------') */

  }

  saveToMongo(userData: any) {
    //mongoose.connect('mongodb://localhost:27017/room1');
    const url = "mongodb+srv://hakan:hakan123@cluster0.ezftf.mongodb.net/colyseus?retryWrites=true&w=majority"

    mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });

    const db = mongoose.connection
    //console.log("MongoDB: ", db)
    db.once("open", function(){
      console.log("Connected successfully")
    })
    
    /* const schema = new mongoose.Schema({
      name: 'string',
      userId: 'string'
    })

    const PlayerModel = mongoose.model('Player', schema) */
    const newPlayer = new PlayerModel({ name: userData.displayName, userId: userData.userId})
    newPlayer.save( err => {
      if(err){
        console.log("Error on saving process")
      }else{
        console.log("Saved to DB")
      }
    })
  }

}
