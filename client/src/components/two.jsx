import React, { useEffect, useState } from 'react';
import { stemmer } from 'stemmer'


const stopwords = ['a', 'about', 'after', 'above', 'again', 'against', 'all', 'am', 'an', 'and', 'are', 'any', "aren't", 'as', 'at', 'be',
  'because',
  'been',
  'before',
  'being',
  'below',
  'between',
  'both',
  'but',
  'by',
  "can't",
  'cannot',
  'could',
  "couldn't",
  'did',
  "didn't",
  'do',
  'does',
  "doesn't",
  'doing',
  "don't",
  'down',
  'during',
  'each',
  'few',
  'for',
  'from',
  'further',
  'had',
  "hadn't",
  'has',
  "hasn't",
  'have',
  "haven't",
  'having',
  'he',
  "he'd",
  "he'll",
  "he's",
  'her',
  'here',
  "here's",
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'how',
  "how's",
  'i',
  "i'd",
  "i'll",
  "i'm",
  "i've",
  'if',
  'in',
  'into',
  'is',
  "isn't",
  'it',
  "it's",
  'its',
  'itself',
  "let's",
  'me',
  'more',
  'most',
  "mustn't",
  'my',
  'myself',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'on',
  'once',
  'only',
  'or',
  'other',
  'ought',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  'same',
  "shan't",
  'she',
  "she'd",
  "she'll",
  "she's",
  'should',
  "shouldn't",
  'so',
  'some',
  'such',
  'than',
  'that',
  "that's",
  'the',
  'their',
  'theirs',
  'them',
  'themselves',
  'then',
  'there',
  "there's",
  'these',
  'they',
  "they'd",
  "they'll",
  "they're",
  "they've",
  'this',
  'those',
  'through',
  'to',
  'too',
  'under',
  'until',
  'up',
  'very',
  'was',
  "wasn't",
  'we',
  "we'd",
  "we'll",
  "we're",
  "we've",
  'were',
  "weren't",
  'what',
  "what's",
  'when',
  "when's",
  'where',
  "where's",
  'which',
  'while',
  'who',
  "who's",
  'whom',
  'why',
  "why's",
  'with',
  "won't",
  'would',
  "wouldn't",
  'you',
  "you'd",
  "you'll",
  "you're",
  "you've",
  'your',
  'yours',
  'yourself',
  'yourselves'];

function Two() {
  const [original1, setOriginal1] = useState('');
  const [original2, setOriginal2] = useState('');
  const [original3, setOriginal3] = useState('');

  const [token1, setToken1] = useState([]);
  const [token2, setToken2] = useState([]);
  const [token3, setToken3] = useState([]);

  const [aftersw1, setaftersw1] = useState([]);
  const [aftersw2, setaftersw2] = useState([]);
  const [aftersw3, setaftersw3] = useState([]);
  const [stemmed, setStemmed] = useState([]);

  const [stemmed1, setStemmed1] = useState([]);
  const [stemmed2, setStemmed2] = useState([]);
  const [stemmed3, setStemmed3] = useState([]);
  const [weightedWord1, setWeightedWord1] = useState([]);
  const [weightedFreq1, setWeightedFreq1] = useState([]);
  const [weightedFreqfreq1, setWeightedFreqfreq1] = useState([]);
  const [weightedWord2, setWeightedWord2] = useState([]);
  const [weightedFreq2, setWeightedFreq2] = useState([]);
  const [weightedFreqfreq2, setWeightedFreqfreq2] = useState([]);
  const [weightedWord3, setWeightedWord3] = useState([]);
  const [weightedFreq3, setWeightedFreq3] = useState([]);
  const [weightedFreqfreq3, setWeightedFreqfreq3] = useState([]);
  const [final1, setFinal1] = useState([]);
  const [final2, setFinal2] = useState([]);
  const [final3, setFinal3] = useState([]);



  function frequencyNormalization() {
    var max = 1;
    for (let i = 0; i < weightedFreq1.length; i++) {
      if (weightedFreq1[i] > max) max = weightedFreq1[i];
    }
    var temp = [];
    for (let i = 0; i < weightedFreq1.length; i++) {
      temp[i] = (weightedFreq1[i] / max).toPrecision(4);

    }
    setWeightedFreqfreq1(temp);
    max = 1;
    for (let i = 0; i < weightedFreq2.length; i++) {
      if (weightedFreq2[i] > max) max = weightedFreq2[i];
    }
    var temp = [];
    for (let i = 0; i < weightedFreq2.length; i++) {
      temp[i] = (weightedFreq2[i] / max).toPrecision(4);

    }
    setWeightedFreqfreq2(temp); max = 1;
    for (let i = 0; i < weightedFreq3.length; i++) {
      if (weightedFreq3[i] > max) max = weightedFreq3[i];
    }
    var temp = [];
    for (let i = 0; i < weightedFreq3.length; i++) {
      temp[i] = (weightedFreq3[i] / max).toPrecision(4);

    }
    setWeightedFreqfreq3(temp);
  }

  function weighting() {
    var wrd = [];
    var cnt = [];
    var fr = [];
    var visited = -1;

    for (var i = 0; i < stemmed1.length; i++) {
      var count = 1;
      for (var j = i + 1; j < stemmed1.length; j++) {
        if (stemmed1[i] == stemmed1[j]) {
          count++;
          //To avoid counting same element again  
          fr[j] = visited;
        }
      }
      if (fr[i] != visited)
        fr[i] = count;
    }
    var x = 0;
    for (var i = 0; i < fr.length; i++) {
      if (fr[i] != visited) {

        wrd[x] = stemmed1[i];
        cnt[x] = fr[i];
        x++;
      }

    }
    setWeightedWord1(wrd);
    setWeightedFreq1(cnt);
    wrd = [];
    cnt = [];
    fr = [];
    visited = -1;

    for (var i = 0; i < stemmed2.length; i++) {
      var count = 1;
      for (var j = i + 1; j < stemmed2.length; j++) {
        if (stemmed2[i] == stemmed2[j]) {
          count++;
          //To avoid counting same element again  
          fr[j] = visited;
        }
      }
      if (fr[i] != visited)
        fr[i] = count;
    }
    var x = 0;
    for (var i = 0; i < fr.length; i++) {
      if (fr[i] != visited) {

        wrd[x] = stemmed2[i];
        cnt[x] = fr[i];
        x++;
      }

    }
    setWeightedWord2(wrd);
    setWeightedFreq2(cnt);
    wrd = [];
    cnt = [];
    fr = [];
    visited = -1;

    for (var i = 0; i < stemmed3.length; i++) {
      var count = 1;
      for (var j = i + 1; j < stemmed3.length; j++) {
        if (stemmed3[i] == stemmed3[j]) {
          count++;
          //To avoid counting same element again  
          fr[j] = visited;
        }
      }
      if (fr[i] != visited)
        fr[i] = count;
    }
    var x = 0;
    for (var i = 0; i < fr.length; i++) {
      if (fr[i] != visited) {

        wrd[x] = stemmed3[i];
        cnt[x] = fr[i];
        x++;
      }

    }
    setWeightedWord3(wrd);
    setWeightedFreq3(cnt);
  }
  function finalweighing() {
    var x = [];
    x = weightedWord1.concat(weightedWord2.concat(weightedWord3));
    console.log(x);
    var f = [];
    for (var i = 0; i < x.length; i++) {
      var cnt = 0;
      if (weightedWord1.includes(x[i])) {
        cnt++;
      }
      if (weightedWord2.includes(x[i])) {
        cnt++;
      }
      if (weightedWord3.includes(x[i])) {
        cnt++;
      }
      f.push(cnt);
    }
    var idf1 = f.slice(0, weightedWord1.length);
    var idf2 = f.slice(weightedWord1.length, weightedWord1.length + weightedWord2.length);
    var idf3 = f.slice(-1 * weightedWord3.length);
    var x;
    for (let i = 0; i < idf1.length; i++) {
      x = 3 / idf1[i];
      x = Math.log2(x);
      idf1[i] = (x * weightedFreqfreq1[i]).toPrecision(2);
    }
    for (let i = 0; i < idf2.length; i++) {
      var x = 3 / idf2[i];
      x = Math.log2(x);
      idf2[i] = (x * weightedFreqfreq2[i]).toPrecision(2);
    }
    for (let i = 0; i < idf3.length; i++) {
      var x = 3 / idf3[i];
      x = Math.log2(x);
      idf3[i] = (x * weightedFreqfreq3[i]).toPrecision(2);
    }
    setFinal1(idf1);
    setFinal2(idf2);
    setFinal3(idf3);
  }
  
  function stem2() {
    var x = [];
    for (let i = 0; i < aftersw1.length; i++) {
      x[i] = stemmer(aftersw1[i]);
    }
    setStemmed1(x);
    x = [];
    for (let i = 0; i < aftersw2.length; i++) {
      x[i] = stemmer(aftersw2[i]);
    }
    setStemmed2(x);
    x = [];
    for (let i = 0; i < aftersw3.length; i++) {
      x[i] = stemmer(aftersw3[i]);
    }
    setStemmed3(x);
  }

  function tokenize() {
    var tokens = original1.trim().toLowerCase().replace(/[.,!?:;""]/g, ' ');
    tokens = tokens.split(' ');
    var filtered = tokens.filter(function (value, index, arr) {
      return (value !== '');
    });
    setToken1(filtered);

    var tokens = original2.trim().toLowerCase().replace(/[.,!?:;""]/g, ' ');
    tokens = tokens.split(' ');
    var filtered = tokens.filter(function (value, index, arr) {
      return (value !== '');
    });
    setToken2(filtered);

    var tokens = original3.trim().toLowerCase().replace(/[.,!?:;""]/g, ' ');
    tokens = tokens.split(' ');
    var filtered = tokens.filter(function (value, index, arr) {
      return (value !== '');
    });
    setToken3(filtered);



    // Axios.patch('http://localhost:3001/token', {orig: original, tokens: token}).then((response)=> {console.log(response);})

  }

  function stopwordRemoval() {
    var swr = token1;
    // var a=['a','djbfs','after','fsbfjsf'];
    for (let i = 0; i < stopwords.length; i++) {
      swr = swr.filter(function (value, index, arr) {
        return value != stopwords[i];
      });
    }
    setaftersw1(swr);
    swr = token2;
    // var a=['a','djbfs','after','fsbfjsf'];
    for (let i = 0; i < stopwords.length; i++) {
      swr = swr.filter(function (value, index, arr) {
        return value != stopwords[i];
      });
    }
    setaftersw2(swr);
    swr = token3;
    // var a=['a','djbfs','after','fsbfjsf'];
    for (let i = 0; i < stopwords.length; i++) {
      swr = swr.filter(function (value, index, arr) {
        return value != stopwords[i];
      });
    }
    setaftersw3(swr);
  }
  return (
    <div className="App">
      <h1>FOR MULTIPLE DOCUMENTS IN A COLLECTION</h1>
      <hr></hr>
      <textarea type='text' onChange={(event) => setOriginal1(event.target.value)} placeholder='Document 1' />
      <textarea type='text' onChange={(event) => setOriginal2(event.target.value)} placeholder='Document 2' />
      <textarea type='text' onChange={(event) => setOriginal3(event.target.value)} placeholder='Document 3' />
<br />
      <button onClick={tokenize}>Tokenize</button>
<h3>Document 1: </h3>
      {    token1.map((tok) => { return <span>{tok} , </span> })}
      <br /><h3>Document 2: </h3>
      {    token2.map((tok) => { return <span>{tok} , </span> })}
      <br /><h3>Document 3: </h3>
      {    token3.map((tok) => { return <span>{tok} , </span> })}
      <br />
      <button onClick={stopwordRemoval}>Remove Stopword</button>
      <h3>Document 1: </h3>
      {    aftersw1.map((swr) => { return <span>{swr} , </span> })}
      <br /> <h3>Document 2: </h3>
      {    aftersw2.map((swr) => { return <span>{swr} , </span> })}
      <br /> <h3>Document 3: </h3>
      {    aftersw3.map((swr) => { return <span>{swr} , </span> })}
      <br />
      <button onClick={stem2}>Stemmer</button>
      <h3>Document 1: </h3>
      {    stemmed1.map((stem) => { return <span>{stem} , </span> })}<br />
      <h3>Document 2: </h3>
      {    stemmed2.map((stem) => { return <span>{stem} , </span> })}
      <br /> <h3>Document 3: </h3>
      {    stemmed3.map((stem) => { return <span>{stem} , </span> })}
      <br />
      <button onClick={weighting}>Term weigh</button><br />
      <h3>Document 1: </h3>
      {    weightedWord1.map((stem) => { return <span>{stem} , </span> })}<br />
      {    weightedFreq1.map((stem) => { return <span>{stem} , </span> })}
      <br /> <h3>Document 2: </h3>
      {    weightedWord2.map((stem) => { return <span>{stem} , </span> })}<br />
      {    weightedFreq2.map((stem) => { return <span>{stem} , </span> })}
      <br /> <h3>Document 3: </h3>
      {    weightedWord3.map((stem) => { return <span>{stem} , </span> })}<br />
      {    weightedFreq3.map((stem) => { return <span>{stem} , </span> })}
      <br />

      <button onClick={frequencyNormalization}>Normalize with Frequency</button>
      <br /> <h3>Document 1: </h3>
      {    weightedFreqfreq1.map((stm) => { return <span>{stm} , </span> })}
      <br /> <h3>Document 2: </h3>
      {    weightedFreqfreq2.map((stm) => { return <span>{stm} , </span> })}
      <br /> <h3>Document 3: </h3>
      {    weightedFreqfreq3.map((stm) => { return <span>{stm} , </span> })}
      <br />
      <button onClick={finalweighing}>Final Weighing with tf * idf</button>
      <br /> <h3>Document 1: </h3>
      {    final1.map((stm) => { return <span>{stm} , </span> })}
      <br /> <h3>Document 2: </h3>
      {    final2.map((stm) => { return <span>{stm} , </span> })}
      <br /> <h3>Document 3: </h3>
      {    final3.map((stm) => { return <span>{stm} , </span> })}
      <br />
      <hr></hr>

    </div>
  );
}



export default Two;