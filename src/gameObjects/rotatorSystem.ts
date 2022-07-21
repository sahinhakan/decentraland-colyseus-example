export class RotatorSystem {
    // this group will contain every entity that has a Transform component
    group = engine.getComponentGroup(Transform)

    constructor(){
        engine.addSystem(this);
    }
  
    update(dt: number) {
      // iterate over the entities of the group
      for (const entity of this.group.entities) {
        // get the Transform component of the entity
        const transform = entity.getComponent(Transform)
  
        // mutate the rotation
        transform.rotate(Vector3.Up(), dt * 10)
      }
    }
  }