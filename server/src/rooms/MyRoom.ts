import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

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
    console.log(newPlayer.name, 'joined! => ', options.userData)
    console.log('Client: ', client)
    console.log('-------------------------------------------------')

  }

  onLeave (client: Client, consented: boolean) {
    const player = this.state.players.get(client.sessionId)
    console.log(player.name, 'left!')
    console.log(client.sessionId, "left!")

    this.state.players.delete(client.sessionId)
    //eğer delete etmezsek de odada kimse kalmayınca dispose olur mu?
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
