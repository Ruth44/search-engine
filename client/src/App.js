import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {stemmer} from 'stemmer'
import Two from './components/two';


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
function App() {
  const [original, setOriginal] = useState('');
  const [token, setToken] = useState([]);
  const [aftersw, setaftersw] = useState([]);
  const [stemmed, setStemmed] = useState([]);
  const [weightedWord, setWeightedWord]= useState([]);
  const [weightedFreq, setWeightedFreq]= useState([]);
  const [weightedFreqlength, setWeightedFreqlength]= useState([]);
  const [weightedFreqfreq, setWeightedFreqfreq]= useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/read',{original: original}).then((response)=>{
      // console.log(response);
    })
  })
  function lengthNormalization(){
    var cnt=0;
    for (let i = 0; i < weightedFreq.length; i++) {
      cnt=cnt+weightedFreq[i];
    }
    var temp=[];
    for (let i = 0; i < weightedFreq.length; i++) {
      temp[i]=(weightedFreq[i]/cnt).toPrecision(4);
      
    }
    // g.forEach((item,index,arr) => arr[index]= (item/x).toPrecision(4));
setWeightedFreqlength(temp);
  }
  function frequencyNormalization(){
    var max=1;
    for (let i = 0; i < weightedFreq.length; i++) {
      if(weightedFreq[i]>max)max=weightedFreq[i];
    }
    var temp=[];
    for (let i = 0; i < weightedFreq.length; i++) {
      temp[i]=(weightedFreq[i]/max).toPrecision(4);
      
    }
setWeightedFreqfreq(temp);
  }
function weighting(){
  var wrd=[];
  var cnt=[];
  var fr = [] ;  
  var visited = -1;  
  for(var i = 0; i < stemmed.length; i++){  
      var count = 1;  
      for(var j = i+1; j < stemmed.length; j++){  
          if(stemmed[i] == stemmed[j]){  
              count++;  
              //To avoid counting same element again  
              fr[j] = visited;  
          }  
      }  
      if(fr[i] != visited)  
          fr[i] = count;  
  }
  var x=0;
  for(var i = 0; i < fr.length; i++){  
    if(fr[i] != visited) {
     
      wrd[x]=stemmed[i];
      cnt[x]=fr[i];
      x++;
    } 

}    
setWeightedWord(wrd);
setWeightedFreq(cnt);
}

function stem(){
  var s=[];
  aftersw.forEach(sw => {
    s.push(stemmerr(sw));
    // s.push(stemmer(sw));
  });
  console.log(s);
  setStemmed(s);
}
function stem2(){
  var x=[];
  for (let i = 0; i < aftersw.length; i++) {
    x[i]=stemmer(aftersw[i]);
  }
  setStemmed(x);
}
  var stemmerr = (function(){
    var step2list = {
        "ational" : "ate",
        "tional" : "tion",
        "enci" : "ence",
        "anci" : "ance",
        "izer" : "ize",
        "bli" : "ble",
        "alli" : "al",
        "entli" : "ent",
        "eli" : "e",
        "ousli" : "ous",
        "ization" : "ize",
        "ation" : "ate",
        "ator" : "ate",
        "alism" : "al",
        "iveness" : "ive",
        "fulness" : "ful",
        "ousness" : "ous",
        "aliti" : "al",
        "iviti" : "ive",
        "biliti" : "ble",
        "logi" : "log"
      },
  
      step3list = {
        "icate" : "ic",
        "ative" : "",
        "alize" : "al",
        "iciti" : "ic",
        "ical" : "ic",
        "ful" : "",
        "ness" : ""
      },
  
      c = "[^aeiou]",          // consonant
      v = "[aeiouy]",          // vowel
      C = c + "[^aeiouy]*",    // consonant sequence
      V = v + "[aeiou]*",      // vowel sequence
  
      mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
      meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
      mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
      s_v = "^(" + C + ")?" + v;                   // vowel in stem
  
    return function (w) {
      var 	stem,
        suffix,
        firstch,
        re,
        re2,
        re3,
        re4,
        origword = w;
  
      if (w.length < 3) { return w; }
  
      firstch = w.substr(0,1);
      if (firstch == "y") {
        w = firstch.toUpperCase() + w.substr(1);
      }
  
      // Step 1a
      re = /^(.+?)(ss|i)es$/;
      re2 = /^(.+?)([^s])s$/;
  
      if (re.test(w)) { w = w.replace(re,"$1$2"); }
      else if (re2.test(w)) {	w = w.replace(re2,"$1$2"); }
  
      // Step 1b
      re = /^(.+?)eed$/;
      re2 = /^(.+?)(ed|ing)$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        re = new RegExp(mgr0);
        if (re.test(fp[1])) {
          re = /.$/;
          w = w.replace(re,"");
        }
      } else if (re2.test(w)) {
        var fp = re2.exec(w);
        stem = fp[1];
        re2 = new RegExp(s_v);
        if (re2.test(stem)) {
          w = stem;
          re2 = /(at|bl|iz)$/;
          re3 = new RegExp("([^aeiouylsz])\\1$");
          re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
          if (re2.test(w)) {	w = w + "e"; }
          else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
          else if (re4.test(w)) { w = w + "e"; }
        }
      }
  
      // Step 1c
      re = /^(.+?)y$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        re = new RegExp(s_v);
        if (re.test(stem)) { w = stem + "i"; }
      }
  
      // Step 2
      re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        suffix = fp[2];
        re = new RegExp(mgr0);
        if (re.test(stem)) {
          w = stem + step2list[suffix];
        }
      }
  
      // Step 3
      re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        suffix = fp[2];
        re = new RegExp(mgr0);
        if (re.test(stem)) {
          w = stem + step3list[suffix];
        }
      }
  
      // Step 4
      re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
      re2 = /^(.+?)(s|t)(ion)$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        re = new RegExp(mgr1);
        if (re.test(stem)) {
          w = stem;
        }
      } else if (re2.test(w)) {
        var fp = re2.exec(w);
        stem = fp[1] + fp[2];
        re2 = new RegExp(mgr1);
        if (re2.test(stem)) {
          w = stem;
        }
      }
  
      // Step 5
      re = /^(.+?)e$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        re = new RegExp(mgr1);
        re2 = new RegExp(meq1);
        re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
          w = stem;
        }
      }
  
      re = /ll$/;
      re2 = new RegExp(mgr1);
      if (re.test(w) && re2.test(w)) {
        re = /.$/;
        w = w.replace(re,"");
      }
  
      // and turn initial Y back to y
  
      if (firstch == "y") {
        w = firstch.toLowerCase() + w.substr(1);
      }
  
      return w;
    }
  })();


  function add (){
    Axios.post('http://localhost:3001/insert', {original: original }).then((response)=> {console.log(response);})
  }
  function tokenize(){
    var tokens= original.trim().toLowerCase().replace(/[.,!?:;""]/g,' ');
    tokens= tokens.split(' ');
     var filtered = tokens.filter(function(value, index, arr){ 
      return (value !== '');
  });
 
  setToken(filtered);

    Axios.patch('http://localhost:3001/token', {orig: original, tokens: token}).then((response)=> {console.log(response);})

  }

  function stopwordRemoval(){
      var swr= token;
   for (let i = 0; i < stopwords.length; i++) {
    swr = swr.filter(function(value, index, arr){ 
      return value  !=stopwords[i] ;
});
   }
  setaftersw(swr);
    console.log(swr)

  }
  return (
    <div className="App">
    {/* <form className="home"> */}
  <h1>SEARCH ENGINE</h1>
  <h1>FOR INDIVIDUAL DOCUMENTS</h1>
 <hr></hr>
      <textarea type='text' onChange={(event)=> setOriginal(event.target.value)} placeholder='Original'/>
     <br /> <button onClick={add}>Add</button>
      <br />

      <button onClick={tokenize}>Tokenize</button>
      <br />
                {    token.map((tok)=> {return <span>{tok} , </span>}) }
                <br />

                <button onClick={stopwordRemoval}>Stop Word remove</button>
                <br />

                {    aftersw.map((swr)=> {return <span>{swr} , </span>}) }
                <br />

                <button onClick={stem}>Stemmer option 1(Porter's Algorithm)</button>
                <button onClick={stem2}>Stemmer option 2(Javascript Stemmer function)</button>
                <br />

                {    stemmed.map((stem)=> {return <span>{stem}  </span>}) }
                <br />

                <button onClick={weighting}>Term weigh</button>
                <br />

                {    weightedWord.map((stem)=> {return <span>{stem}  </span>}) }<br />
                {    weightedFreq.map((stem)=> {return <span>{stem}  </span>}) }
                <br />

                <button onClick={lengthNormalization}>Normalize using Length</button>
                <br />

                {    weightedFreqlength.map((s)=> {return <span>{s} , </span>}) }
                <br />

                <button onClick={frequencyNormalization}>Normalize using frequency</button>
                <br />

                {    weightedFreqfreq.map((stm)=> {return <span>{stm} , </span>}) }
<hr></hr>
<Two />
     </div>
  );
}

export default App;
