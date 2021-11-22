import Vue from 'vue'

// GENERAL
import TButton from '@/components/UI/TButton'
import TModal from '@/components/UI/TModal'
import CustomIcon from '@/components/UI/CustomIcon'
import LocaleLink from '@/components/UI/LocaleLink'

// ADMIN
import TInput from '@/components/admin/UI/TInput'
import TDropdown from '@/components/admin/UI/TDropdown'
import TTextArea from '~/components/admin/UI/TTextArea'
import TCheckbox from '~/components/admin/UI/TCheckbox'
import TFileUpload from '~/components/admin/UI/TFileUpload'
import TSelect from '~/components/admin/UI/input-select/TSelect'
import TForm from '~/components/admin/containers/forms/TForm'

// GENERAL
Vue.component('TButton', TButton)
Vue.component('TModal', TModal)
Vue.component('CustomIcon', CustomIcon)
Vue.component('LocaleLink', LocaleLink)

// ADMIN
Vue.component('TInput', TInput)
Vue.component('TDropdown', TDropdown)
Vue.component('TTextArea', TTextArea)
Vue.component('TCheckbox', TCheckbox)
Vue.component('TFileUpload', TFileUpload)
Vue.component('TSelect', TSelect)

Vue.component('TForm', TForm)
