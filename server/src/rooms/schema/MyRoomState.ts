import { Schema, Context, type, MapSchema, ArraySchema } from "@colyseus/schema";

/* export class MyRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";

} */

export enum cubeColor {
  NEUTRAL,
  BLUE,
  RED
}

export class Player extends Schema {
  @type('string') id: string
  @type('string') name: string
  @type('number') color: cubeColor
  constructor(id: string, name: string){
    super()
    this.id = id
    this.name = name
    this.color = cubeColor.NEUTRAL
  }
}

export class Cube extends Schema {
  @type('number') id: number
  @type('number') color: cubeColor
  constructor(id: number){
    super()
    this.id = id
    this.color = cubeColor.NEUTRAL
  }
}

export class MyRoomState extends Schema{
  @type([Cube]) cubes = new ArraySchema<Cube>()
  @type({ map: Player}) players = new MapSchema<Player>()
  @type({ map: Player}) allPlayers = new MapSchema<Player>()
  constructor(cubeCount: number = 8, allPlayers?: MapSchema<Player>){
    super()
    for(let i=0; i< cubeCount; i++){
      this.cubes.push(new Cube(i))
    }
    if(allPlayers){
      this.allPlayers = allPlayers.clone()
    }
  }
}