import { RotatorSystem, Cube, Mouse } from '../gameObjects/index';
import { LerpData, LerpMove } from '../modules/follow';
import resources from '../resources';

export function CreateScene1(): void {
	//sahnedeki tüm objeleri sürekli olarak döndüren sistemi ekledik
	//new RotatorSystem();

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

  //create messagebus
  const sceneMessageBus = new MessageBus()
  sceneMessageBus.on('createCube', (e) => {
    new Cube(e.x * 8 + 1, e.y * 8, e.z * 8 + 1)
  })

	/// --- Spawn a cube ---
	const cube = new Cube(8,1,8)

	cube.addComponent(
		new OnPointerDown(() => {
			const x : number = Math.random()
			const y : number = Math.random()
			const z : number = Math.random()
      sceneMessageBus.emit('createCube', {x, y, z})
			//new Cube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
		})
	)
}