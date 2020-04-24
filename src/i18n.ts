/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Vue from "vue"
import VueI18n, { LocaleMessages } from "vue-i18n"

Vue.use(VueI18n)

function loadLocaleMessages (): LocaleMessages {
  const locales = require.context("./locales", true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: "de",
  fallbackLocale: "de",
  messages: loadLocaleMessages()
})
