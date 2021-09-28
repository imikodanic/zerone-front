import VueService from 'vue-api-services'

const url = 'admin/projects'

const fromUrl = (suffix = '') => url + (suffix ? '/' + suffix : '')

const ProjectService = VueService.create({
  name: 'project',
  handleResponse(res) {
    return res.data
  },
  handleError(res) {
    const { status, statusText } = res.response
    return {
      status,
      statusText,
      hasErrored: true,
    }
  },
  endpoints: {
    index: ({ search, orderBy, order, page, limit } = {}) => ({
      url: fromUrl(),
      method: 'get',
    }),
    get: (id) => ({
      url: fromUrl(id),
      method: 'get',
    }),
    patch: (project) => ({
      url: fromUrl(project.id),
      data: project,
      method: 'put',
    }),
    post: (project) => ({
      url: fromUrl(),
      method: 'post',
      data: project,
    }),
    delete: (id) => ({
      url: fromUrl(id),
      method: 'delete',
    }),
  },
})

export default ProjectService
