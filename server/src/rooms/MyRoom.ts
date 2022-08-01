import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";
import { allPlayers, saveAllPlayers } from './MyRoomData'

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

}
