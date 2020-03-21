
const  patternDict = [{
    pattern: "\\b(?<greeting>[Hh]i|[Hh]ello|[Hh]ey)\\b",
    intent: "Hello, I'm here to help you\nHow are you ?",
  },{
    pattern: "\\b(?<quit>bye|exit|goodbye)\\b",
    intent: "see you another time"
  },{
    pattern: "([I'm ]?Fine|[Gg]ood|[I'm ]?[Oo]kay)",
    intent: "Great ! how can I help you ?"
  },{
    pattern: "(really bad|not good|[I'm in a ]?bad mood)",
    intent: "Oh I'm sorry, how can I help you ?"
  },{
    pattern: "covid[-19]?|corona[virus]?",
    intent: "coronavirus",
  },{
    pattern: "What are|is the ([last ]?news|actuality) today",
    intent: "news",
  }
  ];
  module.exports = patternDict;
  