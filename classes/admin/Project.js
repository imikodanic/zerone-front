export default class Project {
  constructor(props) {
    if (!props || typeof props !== 'object') props = {}

    this.id = props.id || null
    this.title = props.title || null
    this.description = props.description || null
    this.is_visible = props.is_visible || false
  }
}
