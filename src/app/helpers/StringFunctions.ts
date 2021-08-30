export class StringFunctions {
  static capitalizePhrase(phrase: string): string {
    let words = phrase.split(' ');
    for(let i=0; i<words.length; i++) {
      const partUpper = words[i].charAt(0).toLocaleUpperCase();
      const partLower = words[i].slice(1).toLowerCase();
      words[i] = partUpper + partLower;
    }
    return words.join(' ');
  }
}
