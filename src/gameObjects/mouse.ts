import resources from "../resources"

export class Mouse extends Entity {
	constructor(transform: TranformConstructorArgs){
		super()
		engine.addEntity(this)

		this.addComponent(resources.models.mouse)
		//this.addComponent(new BoxShape())
		this.addComponent(new Transform(transform))

		this.addComponent(new Animator());
    this.getComponent(Animator).addClip(new AnimationState("Mouse_Action"));

    this.getComponent(Animator)
      .getClip("Mouse_Action")
      .play();
	}
}