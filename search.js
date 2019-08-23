var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var reChar = (s) => s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el=> [el,String.fromCharCode(/d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;

function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

  function aninCloseBtn(){
    var l1 = gi(document,'close-layer-1');
    var l2 = gi(document,'close-layer-2');
    l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
    l1.style.transition = "all 333ms";
    l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
    l2.style.transition = "all 333ms";
  }
  function anoutCloseBtn(){
    var l1 = gi(document,'close-layer-1');
    var l2 = gi(document,'close-layer-2');
    l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l1.style.transition = "all 333ms";
    l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
    l2.style.transition = "all 333ms";
  }

  function aniExp(){
    var status = this.getAttribute('expander-elm');

    var l1 = tn(this,'path')[0];
    var l2 = tn(this,'path')[1];
    if(status == 'closed'){
      l1.style.transform = "translate(49px, 50px) rotate(90deg) translate(-49px, -50px)";
      l1.style.transition = "all 333ms";
      l2.style.transform = "translate(49px, 50px) rotate(180deg) translate(-49px, -50px)";
      l2.style.transition = "all 333ms";
      attr(this,'expander-elm','closed');
    }else{
      l1.style.transform = "translate(49px, 50px) rotate(180deg) translate(-49px, -50px)";
      l1.style.transition = "all 333ms";
      l2.style.transform = "translate(49px, 50px) rotate(180deg) translate(-49px, -50px)";
      l2.style.transition = "all 333ms";
      attr(this,'expander-elm','open');
	}
  }

function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}

function createNewHTMLSelectorView(){
  if(gi(document,'fieldCont-betterSearch')) gi(document,'fieldCont-betterSearch').outerHTML = '';

  var facetItems = Array.from(cn(document, 'facetmulti-fieldset')).filter(el=> showThese.some(itm=> tn(el,'a')[0].innerText.trim() == itm) )
.map(el=> {
  var fieldText = tn(el,'a')[0].innerText.trim();
  var facet = reg(/(?<=facetlist-)[a-zA-Z]+/.exec(tn(el,'div')[0].getAttribute('class')),0);
  var optionValues = Array.from(tn(el, 'label')).map(itm=> {
	return {
		label: itm.innerText.trim(),
		value: tn(itm, 'input')[0].value
		};
	});
  return {
  	fieldText: fieldText,
	facet: facet,
    options: optionValues
	}
  
})
  console.log(facetItems)

  var fieldCont = ele('div');
  attr(fieldCont,'id','fieldCont-betterSearch')
  attr(fieldCont,'style',`position: fixed; width: 260px; max-height: ${Math.round(screen.height * 0.65)}%; top: ${Math.round(screen.height * 0.1)}px; left: 5%; display: grid; grid-template-rows: auto; background: transparent; z-index: 13333; font-family: "Verdana", sans-serif;`);
  document.body.appendChild(fieldCont);

  var head = ele('div');
  fieldCont.appendChild(head);
  attr(head, 'style', 'display: grid; grid-template-columns: 80% 20%; grid-gap: 1%; justify-content: space-between; background: #1c1c1c; color: #fff; padding: 1px; border: 1.2px solid #1c1c1c; border-top-right-radius: 0.15em; border-top-left-radius: 0.15em; cursor: move;');
  head.onmouseover = dragElement;

  var htext = ele('div');
  head.appendChild(htext);
  attr(htext, 'style', 'grid-area: 1 / 1; padding: 4px');
  htext.innerText = 'A Better Search Experience';

  var cls = ele('div');
  head.appendChild(cls);
  attr(cls, 'style', 'grid-area: 1 / 2; width: 24px; height: 24px; cursor: pointer; transform: translate(15px, 2px);');
  cls.innerHTML = `<svg id="close_icon-invite" x="0px" y="0px" viewBox="0 0 100 100">
<g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#d11124" stroke-width="8"><circle cx="50" cy="50" r="48"/><path d="M47.806834,19.6743435 L47.806834,77.2743435" id="close-layer-1" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" id="close-layer-2" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = closeView;

  var c_bod = ele('div'); /* content body */
  fieldCont.appendChild(c_bod);
//   attr(c_bod,'style','width: 100%; display: grid; grid-template-columns: 20% 80%; grid-gap: 12px; justify-content: center; background: #fff; color: #004471; border: 1.2px solid #1c1c1c; border-bottom-left-radius: .2em; border-bottom-right-radius: .2em; padding: 14px;'); 
  attr(c_bod,'id','fieldFormContentContainer');

  for(var i=0; i<facetItems.length; i++){
    var facetCont = ele('div');
    attr(facetCont, 'facet-id', facetItems[i][0]);
    c_bod.appendChild(facetCont);

    var fHead = ele('div');
    attr(fHead, 'style', 'display: grid; grid-template-columns: 80% 20%; grid-gap: 1%; justify-content: space-between; background: #1c1c1c; color: #fff; padding: 1px; border: 1.2px solid #1c1c1c; border-top-right-radius: 0.15em; border-top-left-radius: 0.15em;');
    facetCont.appendChild(fHead);
    
    var htext = ele('div');
    attr(htext, 'style', 'grid-area: 1 / 1; padding: 4px');
    htext.innerText = facetItems[i][1];
    fHead.appendChild(htext);
    
    var hmin = ele('div');
    attr(hmin,'expander-elm','closed');
    attr(hmin, 'style', 'grid-area: 1 / 2; padding: 4px; cursor: pointer;');
    hmin.innerHTML = `<svg class="expander-svg" x="0px" y="0px" viewBox="0 0 100 100">
<g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#d11124" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" class="expander-svg-1" transform="translate(49, 50) rotate(180) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" class="expander-svg-2" transform="translate(49, 50) rotate(180) translate(-49, -50) "/></g></g></svg>`;
    hmin.onclick = aniExp;
    fHead.appendChild(hmin);
    
  }
function expander(){
  if(this.getAttribute('expander-elm') == 'ddc-icon ddc-icon-collapse-circle'){
	attr(this,'expander-elm','ddc-icon ddc-icon-collapse-circle');
  }else{
    attr(this,'expander-elm','ddc-icon ddc-icon-expand-circle');
  }
}

}
createNewHTMLSelectorView()
