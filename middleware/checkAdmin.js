export default function ({ store, redirect }) {
  const { role_id } = store.state.auth.user || {}
  if (role_id !== 1) redirect('/')
}
