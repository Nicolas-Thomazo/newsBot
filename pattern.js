const  patternDict = [{
  pattern: "\\b([Hh]i|[Hh]ello|[Hh]ey|[Ww]hat's up)\\b",
  intent: "Hello, I'm here to help you 😎\nHow are you ?",
  case : 1
},{
  pattern: "\\b(?<quit>bye|exit|goodbye)\\b",
  intent: "see you another time 👋",
  case : 1
},{
  pattern: "\\b([Ww]hat can you do|What are you)\\b",
  intent: "I am a chatbot that gives news, if you want more info write help 😉",
  case : 1
},{
  pattern: "[Hh]elp",
  intent: "help",
  case : 3
},{
  pattern: "([I'm ]?Fine|I'm [Gg]ood|I'm [Oo]kay)",
  intent: "Great ! how can I help you ? 🤔",
  case : 1
},{
  pattern: "(really bad|not good|[I'm in a ]?bad mood)",
  intent: "Oh I'm sorry 😯, how can I help you ?",
  case : 1
},{
  pattern: "[Cc]ovid[-19]?|[cC]orona[virus]?",
  intent: "coronavirus",
  case : 2
},{
  pattern: "[Nn]ews|[aA]ctuality",
  intent: "news",
  case : 2
},{
  pattern: "[eE][uU]|\\b[eE]uropian\\b\\s?[Uu]nion$",
  intent: "europian union EU",
  case : 2
},{
  pattern: "[bB]rexit",
  intent: "brexit",
  case : 2
},{
  pattern: "\\b[Uu][Ss][Aa]|[uU]nited States( of [Aa]merica)?\\b",
  intent: "USA America",
  case : 2
},{
  pattern: "\\b[Ff]rance\\b",
  intent: "France",
  case : 2
},{
  pattern: "\\b[Rr]ussia\\b",
  intent: "Russia",
  case : 2
},{
  pattern: "\\b[Gg]ermany?\\b",
  intent: "Germany",
  case : 2
},{
  pattern: "\\b[Cc]hina\\b",
  intent: "China",
  case : 2
},{
  pattern: "\\b[Ii]srael\\b",
  intent: "Israel",
  case : 2
},{
  pattern: "\\[Uu]nited\\s?[Kk]ingdom\\b|\\b[Uu][Kk]\\b",
  intent: "United-Kingdom",
  case : 2
},{
  pattern:"\\b[Ee]conom[cy]\\b|\\b[mM]arket\\b|\\b[tT]rade\\b",
  intent: "economy",
  case : 2
},{
  pattern: "\\b[wW]ar\\b|\\b[aA]ttack\\b|\\b[bB]ombing|[Kk]illing",
  intent: "war",
  case : 2
},{
  pattern: "\\b[gG]lobal\\swarming\\b|\\b[cC]limat(\\s?[cC]hange)?",
  intent: "climat",
  case : 2
},{
  pattern: "\\b[Ee]nvironment\\b",
  intent: "environment",
  case : 2
},{
  pattern: "\\b[Aa]ctivis[tm]\\b",
  intent: "activist",
  case : 2
},{
  pattern: "\\b[Ee]lections?\\b",
  intent: "election",
  case : 2
},{
  pattern: "\\b[Cc]elebrity\\b|\\b[Ff]amous\\b",
  intent: "celebrity",
  case : 2
},{
  pattern: "\\b[Pp]opstar\\b",
  intent: "popstar famous",
  case : 2
},{
  pattern: "\\b[Ss]tar\\b",
  intent: "star",
  case : 2
},{
  pattern: "\\b[Pp]resident\\b",
  intent: "president",
  case : 2
},{
  pattern: "\\b[Cc]onflicts?\\b",
  intent: "conflict",
  case : 2
},{
  pattern: "\\b[Oo]ceans?\\b",
  intent: "ocean",
  case : 2
},{
  pattern: "\\b[Aa]mazonas\\b",
  intent: "amazonas",
  case : 2
},{
  pattern: "\\b[Cc]atastrophes?\\b",
  intent: "catastrophe",
  case : 2
},{
  pattern: "\\b[Tt]ornados?\\b",
  intent: "tornado",
  case : 2
},{
  pattern: "\\b[Ee]arthquakes?\\b",
  intent: "earthquake",
  case : 2
},{
  pattern: "\\b[Aa]sia\\b",
  intent: "asia",
  case : 2
},{
  pattern: "\\b[Aa]frica\\b",
  intent: "africa",
  case : 2
},{
  pattern: "\\b[Aa]ustralia\\b",
  intent: "australia",
  case : 2
},{
  pattern: "\\b[Ee]urope\\b",
  intent: "europe",
  case : 2
}
];
module.exports = patternDict;