export default class Page {
  constructor(props = {}) {
    this.id = props.id || null
    this.title = props.title || null
    this.description = props.description || null
    this.is_visible = props.is_visible || false
    this.is_public = props.is_public ?? true
    this.parent_id = props.parent_id || props.parent?.id || null
    this.project_id = props.project_id || props.project?.id || null
  }
}
