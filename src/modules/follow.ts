@Component('lerpData')
export class LerpData {
  target: Vector3 = Vector3.Zero()
  origin: Vector3 = Vector3.Zero()
  fraction: number = 0
  fractionIterator: number = 1 / 15000

  constructor(iterator?: number){
	if(iterator)
		this.fractionIterator =  1 /iterator
  }
}

const camera = Camera.instance
const followers = engine.getComponentGroup(LerpData)

export class LerpMove implements ISystem {
	update(dt: number){
		//log("Follow->update dt: ", dt)
		for(const follower of followers.entities){
			const transform = follower.getComponent(Transform)
			const walk = follower.getComponent(LerpData)
			transform.lookAt(walk.target)
			const newTarget = camera.position.clone()
			newTarget.y = 0
			walk.target = newTarget
			walk.origin = transform.position
			if(walk.fraction < 1 && 
				Vector3.Distance(walk.target, transform.position) > 2){
				if (!isInBounds(walk.target)) return
				transform.position = Vector3.Lerp(
					walk.origin,
					walk.target,
					walk.fraction
				)
				walk.fraction += walk.fractionIterator
			}else {
				walk.fraction = 0
			}
		}
	}
}

// check if the target is inside the scene's bounds
export function isInBounds(position: Vector3): boolean {
  return (
    position.x > 0 && position.x < 16 && position.z > 0 && position.z < 16
  )
}