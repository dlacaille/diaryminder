function ts() {
  return Date.now().toLocaleString()
}

function prefix(type: "LOG" | "ERR" | "WRN" | "INF" | "DBG" | "TRC") {
  return `${type} ${ts()}:`
}

const Log = {
  log(...data: any[]) {
    console.log(prefix("LOG"), ...data)
  },
  error(...data: any[]) {
    console.error(prefix("ERR"), ...data)
  },
  warn(...data: any[]) {
    console.warn(prefix("WRN"), ...data)
  },
  info(...data: any[]) {
    console.info(prefix("INF"), ...data)
  },
  debug(...data: any[]) {
    console.debug(prefix("DBG"), ...data)
  },
  trace(...data: any[]) {
    console.trace(prefix("TRC"), ...data)
  },
}

export default Log
