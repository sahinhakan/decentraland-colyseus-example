import resources from "../resources"

export class Mouse extends Entity {
	constructor(transform: TranformConstructorArgs, model: GLTFShape = resources.models.mouse){
		super()
		engine.addEntity(this)

		this.addComponent(model)
		//this.addComponent(new BoxShape())
		this.addComponent(new Transform(transform))

		this.addComponent(new Animator());
    this.getComponent(Animator).addClip(new AnimationState("Mouse_Action"));

    this.getComponent(Animator)
      .getClip("Mouse_Action")
      .play();
	}
}