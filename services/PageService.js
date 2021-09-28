import VueService from '../plugins/doServiceYo'

const url = 'admin/pages'

const fromUrl = (suffix = '') => url + (suffix ? '/' + suffix : '')

const PageService = VueService.create({
  name: 'page',
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
    patch: (page) => ({
      url: fromUrl(page.id),
      data: page,
      method: 'patch',
    }),
    post: (page) => ({
      url: fromUrl(),
      method: 'post',
      data: page,
    }),
    delete: (id) => ({
      url: fromUrl(id),
      method: 'delete',
    }),
  },
})

export default PageService
