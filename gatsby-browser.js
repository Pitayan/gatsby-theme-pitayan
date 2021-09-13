// global stylesheet
import "@/assets/css/style.css"

import { checkIfDarkMode, toggleDark } from '@/utils'

// toggle Dark mode
toggleDark(checkIfDarkMode())
