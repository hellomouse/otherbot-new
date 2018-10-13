const CONTROL_CODES = ['\\x0f', '\\x16', '\\x1d', '\\x1f', '\\x02', '\\x03([0-9][0-6]?)?,?([0-9][0-6]?)?'];

/**
* Strips formatting from IRC messages
* @param {string} msg
* @return {string}
*/
function stripFormatting(msg: string): string {
  for (let cc of CONTROL_CODES) {
    msg = msg.replace(new RegExp(cc, 'g'), '');
  }

  return msg;
}

export {
  stripFormatting
};
