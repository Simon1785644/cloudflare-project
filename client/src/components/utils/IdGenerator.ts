/**
 * Makes Decimal transfer to Hexadecimal.
 * e.g.255 -> ff
 * 
 * @param dec Decimal
 * @returns Hexadecimal string
 */
function dec2hex(dec:number) {
  return dec.toString(16).padStart(2, "0")
}

/**
* Random string generator
* 
* @param length what string length that you need
* @returns array
*/
export default function generateId(length:number) {
  const arr = new Uint8Array((length || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}