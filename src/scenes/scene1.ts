import { RotatorSystem, Cube, Mouse } from '../gameObjects/index';
import { LerpData, LerpMove } from '../modules/follow';

export function CreateScene1(): void {
	//sahnedeki tüm objeleri sürekli olarak döndüren sistemi ekledik
	//new RotatorSystem();

	/// --- Spawn a cube ---
	/* const cube = new Cube(8,1,8)

	cube.addComponent(
		new OnPointerDown(() => {
			//uzunlugunu artırıp genişliğini küçültüyor.
			//cube.getComponent(Transform).scale.z *= 1.1
			//cube.getComponent(Transform).scale.x *= 0.9
	
			new Cube(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
		})
	) */


	//Spawn a mouse
	const mouse = new Mouse({
		position: new Vector3(6,0,6),
		scale: new Vector3(1,1,1)
	})

	//follow sistemini ekliyorum
	engine.addSystem(new LerpMove())

	mouse.addComponent(new LerpData())
}