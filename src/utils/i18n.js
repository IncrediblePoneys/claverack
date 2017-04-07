import i18n from 'i18next'
import en from '../locales/en/common'

i18n.init({
	fallbackLng: 'en',
	resources: {
		en
	},
	defaultNS: 'common'
})

export default i18n
