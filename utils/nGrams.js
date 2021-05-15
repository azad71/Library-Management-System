function createEdgeNGrams(str) {
  if (str && str.length > 3) {
    const minGram = 3;
    const maxGram = str.length;

    return str
      .split(" ")
      .reduce((ngrams, token) => {
        if (token.length > minGram) {
          for (let i = minGram; i <= maxGram && i <= token.length; ++i) {
            ngrams = [...ngrams, token.substr(0, i)];
          }
        } else {
          ngrams = [...ngrams, token];
        }
        return ngrams;
      }, [])
      .join(" ");
  }

  return str;
}

module.exports = createEdgeNGrams;

// let res = createEdgeNGrams("rerum corporis voluptatum");
// console.log(res);
