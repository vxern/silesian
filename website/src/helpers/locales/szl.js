import dayjs from "dayjs";

function plural(n) {
  return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1) // eslint-disable-line
}

function translate(number, withoutSuffix, key) {
  const result = `${number} `
  switch (key) {
    case 'm':
      return withoutSuffix ? 'minuta' : 'minutã'
    case 'mm':
      return result + (plural(number) ? 'minuty' : 'minut')
    case 'h':
      return withoutSuffix ? 'godzina' : 'godzinã'
    case 'hh':
      return result + (plural(number) ? 'godziny' : 'godzin')
    case 'MM':
      return result + (plural(number) ? 'miesiōnce' : 'miesiyncy')
    case 'yy':
      return result + (plural(number) ? 'roki' : 'rokōw')
  }
}

const monthFormat = 'stycznia_lutygo_marca_kwietniŏ_maja_czyrwca_lipniŏ_siyrpniŏ_wrześniŏ_paździyrnika_listopada_grudnia'.split('_')
const monthStandalone = 'styczyń_luty_marzec_kwieciyń_mŏj_czyrwiec_lipiyń_siyrpiyń_wrzesiyń_paździyrnik_listopŏd_grudziyń'.split('_')
const MONTHS_IN_FORMAT = /D MMMM/

const months = (dayjsInstance, format) => {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()]
  }
  return monthStandalone[dayjsInstance.month()]
}
months.s = monthStandalone
months.f = monthFormat

const locale = {
  name: 'szl',
  weekdays: 'niydziela_pyńdziałek_wtorek_strzoda_sztwŏrtek_piōntek_sobota'.split('_'),
  weekdaysShort: 'ndz_pyń_wt_str_szt_pt_sob'.split('_'),
  weekdaysMin: 'Nd_Pń_Wt_St_Sz_Pt_So'.split('_'),
  months,
  monthsShort: 'sty_lut_mar_kwi_mŏj_czy_lip_siy_wrz_paź_lis_gru'.split('_'),
  ordinal: n => `${n}.`,
  weekStart: 1,
  yearStart: 4,
  relativeTime: {
    future: 'za %s',
    past: '%s nazŏd',
    s: 'pŏrã sekund',
    m: translate,
    mm: translate,
    h: translate,
    hh: translate,
    d: 'jedyn dziyń',
    dd: '%d dni',
    M: 'miesiōnc',
    MM: translate,
    y: 'rok',
    yy: translate
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  }
}

dayjs.locale(locale, null, true)

export default locale;
