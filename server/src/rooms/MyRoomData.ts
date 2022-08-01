import { Schema, Context, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { Player } from './schema/MyRoomState'

export let allPlayers = new MapSchema<Player>()

export function saveAllPlayers(players: MapSchema<Player>){
    allPlayers = players.clone()
}