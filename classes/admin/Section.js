class Section {
  constructor(props) {
    this.id = props.id || 0
    if (!props.id) this._key = Date.now()
    this.type = props.type
    this.value = props.value
    this.page_id = props.page_id
  }

  static toJSON() {
    const keys = ['id', 'type', 'value', 'page_id']
    const JSON = {}
    keys.forEach((key) => (JSON[key] = this[key]))
    return JSON
  }
}

export default Section
