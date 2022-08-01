import { ColorfulCube as Cube, cubes, Cone, cubeColor, Mouse } from '../gameObjects/index';
import { LerpData, LerpMove } from '../modules/follow';
import resources from '../resources';
import { getCurrentRealm } from '@decentraland/EnvironmentAPI'
import { connect } from '../connection'

export function CreateScene2(): void {

	// ground
	let floor = new Entity()
	floor.addComponent(new GLTFShape('models/FloorBaseGrass.glb'))
	floor.addComponent(
	new Transform({
		position: new Vector3(8, 0, 8),
		scale: new Vector3(1.6, 0.1, 1.6),
	})
	)
	engine.addEntity(floor)

	//Spawn a mouse
	const mouse = new Mouse({
		position: new Vector3(6,0,6),
		scale: new Vector3(3,3,3)
	})
	mouse.addComponent(new LerpData())

	//follow sistemini ekliyorum
	engine.addSystem(new LerpMove())

	//Spawn another mouse
	const mouseWill = new Mouse({
		position: new Vector3(2,0,2),
		scale: new Vector3(2,2,2)
	}, resources.models.mouseWill)
	mouseWill.addComponent(new LerpData(7500))

	connect('my_room').then((room)=>{

		// add cubes
		for (let i = 0; i < 8; i++) {
		  let cube = new Cube(
			{
			  position: new Vector3(i * 2 + 1, 1, 4),
			}, i, room
		  )
		}
	  
	  
		// add cones
		let blueCone = new Cone(
		  {position: new Vector3(6, 1, 14)},
		  cubeColor.BLUE,
		  room
		)
	  
		let redCone = new Cone(
		  {position: new Vector3(10, 1, 14)},
		  cubeColor.RED,
		  room
		)
	  
		room.onMessage("flashColor", (data)=>{
		  if(data.color == cubeColor.BLUE){
			blueCone.activate()
		  } else {
			redCone.activate()
		  }
		})
	  
		room.state.cubes.onAdd = (cubeData) => {
		  log('Added cube => ', cubeData.id)
		  cubeData.listen('color', (value) => {
		  
			cubes[cubeData.id].activate(value)
			
		  })
		}
	  
	})
	
}