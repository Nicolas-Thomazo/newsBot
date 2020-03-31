
const  patternDict = [{
    pattern: "\\b(?<greeting>[Hh]i|[Hh]ello|[Hh]ey)\\b",
    intent: "Hello, I'm here to help you\nHow are you ?",
    case : 1
  },{
    pattern: "\\b(?<quit>bye|exit|goodbye)\\b",
    intent: "see you another time",
    case : 1
  },{
    pattern: "([I'm ]?Fine|[Gg]ood|[I'm ]?[Oo]kay)",
    intent: "Great ! how can I help you ?",
    case : 1
  },{
    pattern: "(really bad|not good|[I'm in a ]?bad mood)",
    intent: "Oh I'm sorry, how can I help you ?",
    case : 1
  },{
    pattern: "covid[-19]?|corona[virus]?",
    intent: "coronavirus",
    case : 2
  },{
    pattern: "What are|is the ([last ]?news|actuality) today",
    intent: "news",
    case : 2
  },{
    pattern: "[eE][uU]|\\b[eE]uropian\\b\\s?[Uu]nion$",
    intent: "europian union",
    case : 2
  },{
    pattern: "[bB]rexit",
    intent: "brexit",
    case : 2
  },{
    pattern: "\\b[Uu][Ss][Aa]\\b|\\b[Ff]rance\\b|\\b[Rr]ussia\\b|\\b[Gg]ermany?\\b|\\b[Cc]hina\\b|\\b[Uu][Kk]\\b",
    intent: "coutry",
    case : 2
  },{
    pattern:"\\b[Ee]conom[cy]\\b|\\b[mM]arket\\b|\\b[tT]rade\\b",
    intent: "economy",
    case : 2
  },{
    pattern: "\\b[wW]ar\\b|\\b[aA]ttack\\b|\\b[bB]ombing",
    intent: "war",
    case : 2
  },{
    pattern: "\\b[gG]lobal\\swarming\\b|\\b[cC]limat\\s?[cC]hange",
    intent: "environment",
    case : 2
  }
  ];
  module.exports = patternDict;
  