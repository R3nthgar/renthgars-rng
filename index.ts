function strToHash(str: string) {
  let [h1, h2, h3, h4] = [1779033703, 3144134277, 1013904242, 2773480762];
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    [h1, h2, h3, h4] = [
      h2 ^ Math.imul(h1 ^ k, 597399067),
      h3 ^ Math.imul(h2 ^ k, 2869860233),
      h4 ^ Math.imul(h3 ^ k, 951274213),
      h1 ^ Math.imul(h4 ^ k, 2716044179),
    ];
  }
  [h1, h2, h3, h4] = [
    Math.imul(h3 ^ (h1 >>> 18), 597399067),
    Math.imul(h4 ^ (h2 >>> 22), 2869860233),
    Math.imul(h1 ^ (h3 >>> 17), 951274213),
    Math.imul(h2 ^ (h4 >>> 19), 2716044179),
  ];
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}
export default class Random {
  seed: unknown;
  constructor(seed: unknown) {
    this.seed = seed;
  }
  random = () => {
    const str = String(this.seed);
    let [a, b, c, d] = strToHash(str);
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
  shuffle = (arr: unknown[], reverse?: boolean) => {
    const tempArr = [...arr];
    if (!reverse) {
      return new Array(arr.length)
        .fill(undefined)
        .map(
          () =>
            tempArr.splice(
              Math.floor(Number(this.random()) * tempArr.length),
              1
            )[0]
        );
    } else {
      const retArr = new Array(arr.length).fill(undefined);
      const shuffled: number[] = this.shuffle(
        new Array(arr.length).fill(undefined).map((val, index) => index)
      );
      if (shuffled) {
        shuffled.map((val, index) => (retArr[val] = arr[index]));
        return retArr;
      } else return arr;
    }
  };
}
