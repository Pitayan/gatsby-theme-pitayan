// global stylesheet
import "@/assets/css/style.css"

import { checkIfDarkMode, toggleDark } from "@/utils"

import "typeface-merriweather"

// toggle Dark mode
toggleDark(checkIfDarkMode())
