export class Cube extends Entity {

	constructor(x: number, y: number, z: number){
		super();

		// add the entity to the engine
		engine.addEntity(this)

		// add a transform to the entity
		this.addComponent(new Transform({ position: new Vector3(x, y, z) }))

		// add a shape to the entity
		this.addComponent(new BoxShape())
	}
}