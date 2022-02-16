export default class Group {
  constructor(props) {
    if (!props || typeof props !== 'object') props = {}

    this.id = props.id || null
    this.title = props.title || null
    this.description = props.description || null
    this.media_id = props.media || null
    this.is_visible = props.is_visible || false
    this.projects = props.projects ? props.projects.map((p) => p.id) : []
  }
}
