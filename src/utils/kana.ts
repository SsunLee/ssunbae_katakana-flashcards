


// ひらがな(ふりがな) → ローマ字 (Hepburn)
export function kanaToRomaji(kana: string) {
  if (!kana) return '';

  const baseMap: Record<string, string> = {
    あ:'a', い:'i', う:'u', え:'e', お:'o',
    か:'ka', き:'ki', く:'ku', け:'ke', こ:'ko',
    さ:'sa', し:'shi', す:'su', せ:'se', そ:'so',
    た:'ta', ち:'chi', つ:'tsu', て:'te', と:'to',
    な:'na', に:'ni', ぬ:'nu', ね:'ne', の:'no',
    は:'ha', ひ:'hi', ふ:'fu', へ:'he', ほ:'ho',
    ま:'ma', み:'mi', む:'mu', め:'me', も:'mo',
    や:'ya', ゆ:'yu', よ:'yo',
    ら:'ra', り:'ri', る:'ru', れ:'re', ろ:'ro',
    わ:'wa', を:'o', ん:'n',
    が:'ga', ぎ:'gi', ぐ:'gu', げ:'ge', ご:'go',
    ざ:'za', じ:'ji', ず:'zu', ぜ:'ze', ぞ:'zo',
    だ:'da', ぢ:'ji', づ:'zu', で:'de', ど:'do',
    ば:'ba', び:'bi', ぶ:'bu', べ:'be', ぼ:'bo',
    ぱ:'pa', ぴ:'pi', ぷ:'pu', ぺ:'pe', ぽ:'po',
    ぁ:'a', ぃ:'i', ぅ:'u', ぇ:'e', ぉ:'o',
    ゃ:'ya', ゅ:'yu', ょ:'yo',
    っ:'*', // sokuon
    ー:'-'
  };

  const combos: Record<string, string> = {
    きゃ:'kya', きゅ:'kyu', きょ:'kyo',
    ぎゃ:'gya', ぎゅ:'gyu', ぎょ:'gyo',
    しゃ:'sya', しゅ:'syu', しょ:'syo',
    じゃ:'zya', じゅ:'zyu', じょ:'zyo',
    ちゃ:'tya', ちゅ:'tyu', ちょ:'tyo',
    にゃ:'nya', にゅ:'nyu', にょ:'nyo',
    ひゃ:'hya', ひゅ:'hyu', ひょ:'hyo',
    みゃ:'mya', みゅ:'myu', みょ:'myo',
    りゃ:'rya', りゅ:'ryu', りょ:'ryo',
    びゃ:'bya', びゅ:'byu', びょ:'byo',
    ぴゃ:'pya', ぴゅ:'pyu', ぴょ:'pyo'
  };

  const map = baseMap;

  let i = 0;
  let out = '';
  const vowels = ['a','i','u','e','o'];

  const nextRomaji = (idx: number) => {
    const two = kana.slice(idx, idx + 2);
    if (combos[two]) return combos[two];
    const ch = kana[idx];
    return map[ch] || '';
  };

  while (i < kana.length) {
    const two = kana.slice(i, i + 2);
    if (combos[two]) { out += combos[two]; i += 2; continue; }

    const ch = kana[i];

    if (ch === 'っ') {
      // geminate next consonant
      const nxt = nextRomaji(i + 1);
      if (nxt) out += nxt[0];
      i += 1;
      continue;
    }

    if (ch === 'ー') {
      // Hepburn: 직전 모음 반복(마크론 없이 표기)
      const lastVowel = Array.from(out).reverse().find((c) => vowels.includes(c));
      if (lastVowel) out += lastVowel;
      i += 1;
      continue;
    }

    out += map[ch] || ch;
    i += 1;
  }

  // n' before vowels or y
  out = out.replace(/n([yaeiou])/g, "n'$1");
  return out;
}