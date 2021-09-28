class Section {
  constructor(props) {
    if (props.id) {
      this.id = props.id || 0
    } else {
      this._key = Date.now()
    }
    this.type = props.type
    this.value = props.value
    this.page_id = props.page_id
  }

  static toJSON(section) {
    const keys = ['id', 'type', 'value', 'page_id']
    const JSON = {}
    keys.forEach((key) => (JSON[key] = section[key]))
    return JSON
  }
}

export default Section
