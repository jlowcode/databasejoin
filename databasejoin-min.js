/*! Fabrik */

define(['jquery', 'fab/element', 'fab/encoder', 'fab/fabrik', 'fab/autocomplete-bootstrap', './autocompleteMultiselect', './multiSelectTreeView', './singleSelectTreeView', './multiSelectTreeviewAutocomplete', './singleSelectTreeviewAutocomplete', './autocompletemultiselectnovo'],function(jQuery,FbElement,Encoder,Fabrik,AutoComplete){return window.FbDatabasejoin=new Class({Extends:FbElement,options:{id:0,formid:0,key:"",label:"",windowwidth:360,displayType:"dropdown",popupform:0,listid:0,listRef:"",joinId:0,isJoin:!1,canRepeat:!1,fullName:"",show_please_select:!1,allowadd:!1,autoCompleteOpts:null,observe:[]},initialize:function(e,t){this.activePopUp=!1,this.activeSelect=!1,this.setPlugin("databasejoin"),this.parent(e,t),this.init()},watchAdd:function(){var e,t;(e=this.getContainer())&&((t=e.getElement(".toggle-addoption")).removeEvent("click",this.watchAddEvent),this.watchAddEvent=this.start.bind(this),t.addEvent("click",this.watchAddEvent))},start:function(e,t){if(this.options.editable){var i,n=this.getContainer();t=!!t;var o=function(){this.close()};if(i=!1,e&&(e.stop(),o=function(){this.fitToContent(!1)},i=!0,this.activePopUp=!0),(!!0!==t||0!==this.options.popupform&&!1!==this.options.allowadd)&&null!==this.element&&null!==n){var s=n.getElement(".toggle-addoption"),a="null"===typeOf(s)?e.target.get("href"):s.get("href");a+="&format=partial";var l=this.element.id+"-popupwin";this.windowopts={id:l,data:this.form.getFormElementData(),title:Joomla.JText._("PLG_ELEMENT_DBJOIN_ADD"),contentType:"xhr",loadMethod:"xhr",contentURL:a,height:320,minimizable:!1,collapsible:!0,visible:i,modalId:this.options.modalId,onContentLoaded:o,destroy:!0};var r=this.options.windowwidth;""!==r&&(this.windowopts.width=r,this.windowopts.onContentLoaded=o),this.win=Fabrik.getWindow(this.windowopts)}}},getBlurEvent:function(){return"auto-complete"===this.options.displayType?"change":this.parent()},removeOption:function(e,t){var i=document.id(this.element.id);switch(this.options.displayType){case"dropdown":case"multilist":for(var n=i.options,o=0;o<n.length;o++)if(n[o].value===e){i.remove(o),t&&(i.selectedIndex=0),this.options.advanced&&jQuery("#"+this.element.id).trigger("liszt:updated");break}}},addOption:function(e,t,i){var n,o,s,a;switch(t=Encoder.htmlDecode(t),i=void 0===i||i,this.options.displayType){case"dropdown":case"multilist":s=(jQuery.isArray(this.options.value)?this.options.value:[this.options.value]).contains(e)?"selected":"",n=new Element("option",{value:e,selected:s}).set("text",t),document.id(this.element.id).adopt(n),this.options.advanced&&jQuery("#"+this.element.id).trigger("liszt:updated");break;case"auto-complete":i&&(a=this.element.getParent(".fabrikElement").getElement("input[name*=-auto-complete]"),this.element.value=e,a.value=t);break;case"checkbox":n=this.getCheckboxTmplNode().clone(),o=jQuery(Fabrik.jLayouts["fabrik-element-"+this.getPlugin()+"-form-rowopts"])[0],this._addOption(n,t,e,o);break;case"radio":default:n=jQuery(Fabrik.jLayouts["fabrik-element-"+this.getPlugin()+"-form-radio_"+this.strElement])[0],o=jQuery(Fabrik.jLayouts["fabrik-element-"+this.getPlugin()+"-form-rowopts"])[0],this._addOption(n,t,e,o)}},_addOption:function(e,t,i,n){var o="array"===typeOf(this.options.value)?this.options.value:Array.mfrom(this.options.value),s=e.getElement("input"),a=this.getSubOptions(),l=this.getSubOptsRow(),r=!!o.contains(i),d="radio"===this.options.displayType?"":a.length;this.options.canRepeat?s.name=this.options.fullName+"["+this.options.repeatCounter+"]["+d+"]":s.name=this.options.fullName+"["+d+"]",e.getElement("span").set("html",t),e.getElement("input").set("value",i),0===l.length&&n.inject(this.element,"bottom");var h=jQuery(this.element).children("div[data-role=fabrik-rowopts]").last()[0];jQuery(h).children("div[data-role=suboption]").length>=this.options.optsPerRow&&(n.inject(this.element,"bottom"),h=jQuery(this.element).children("div[data-role=fabrik-rowopts]").last()[0]),e.inject(h,"bottom"),e.getElement("input").checked=r},hasSubElements:function(){var e=this.options.displayType;return"checkbox"===e||"radio"===e||this.parent()},getCheckboxTmplNode:function()
	{if(typeof chxTmplNode !== "undefined" && chxTmplNode !== null){ if(Fabrik.bootstrapped&&(this.chxTmplNode=jQuery(Fabrik.jLayouts["fabrik-element-"+this.getPlugin()+"-form-checkbox_"+this.strElement])[0], !this.chxTmplNode&&"checkbox"===this.options.displayType)){var e=this.element.getElements("> .fabrik_subelement");0===e.length?(this.chxTmplNode=this.element.getElement(".chxTmplNode").getChildren()[0].clone(),this.element.getElement(".chxTmplNode").destroy()):this.chxTmplNode=e.getLast().clone()}}return this.chxTmplNode},getCheckboxRowOptsNode:function(){if(Fabrik.bootstrapped)this.chxTmplNode=jQuery(Fabrik.jLayouts["fabrik-element-"+this.getPlugin()+"-form-rowopts"])[0];
	else if(!this.chxTmplNode&&"checkbox"===this.options.displayType){var e=this.element.getElements("> .fabrik_subelement");0===e.length?(this.chxTmplNode=this.element.getElement(".chxTmplNode").getChildren()[0].clone(),this.element.getElement(".chxTmplNode").destroy()):this.chxTmplNode=e.getLast().clone()}return this.chxTmplNode},updateFromServer:function(r){var e=this.form.getFormElementData(),d=this,t={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"databasejoin",method:"ajax_getOptions",element_id:this.options.id,formid:this.options.formid,repeatCounter:this.options.repeatCounter};if(t=Object.append(e,t),"auto-complete"===this.options.displayType&&""===r)return this.addOption("","",!0),this.element.fireEvent("change",new Event.Mock(this.element,"change")),void this.element.fireEvent("blur",new Event.Mock(this.element,"blur"));r&&(t[this.strElement+"_raw"]=r,t[this.options.fullName+"_raw"]=r),Fabrik.loader.start(this.element.getParent(),Joomla.JText._("COM_FABRIK_LOADING")),new Request.JSON({url:"",method:"post",data:t,onSuccess:function(e){Fabrik.loader.stop(d.element.getParent());var t,i=!1,n=d.getOptionValues();if("auto-complete"!==d.options.displayType||""!==r||0!==n.length){var o=[];if(e.each(function(e){o.push(e.value),n.contains(e.value)||null===e.value?e.selected&&d.options.value!==e.value&&(i=!0,d.update(e.value)):(e.selected&&(d.options.value=e.value,i=!0),(t=d.options.value===e.value)&&d.activePopUp&&(i=!0),d.addOption(e.value,e.text,t))}),n.each(function(e){o.contains(e)||(t=i=d.getValue()===e,d.removeOption(e,t))}),i&&(d.element.fireEvent("change",new Event.Mock(d.element,"change")),d.element.fireEvent("blur",new Event.Mock(d.element,"blur"))),d.options.showDesc){var s=d.getContainer().getElement(".dbjoin-description");jQuery(s).empty();var a=jQuery(Fabrik.jLayouts["fabrik-element-"+d.getPlugin()+"-form-description-div"])[0],l=0;e.each(function(e){var t=jQuery(a).clone();t.removeClass("description-0"),t.addClass("description-"+l++),d.options.value===e.value&&t.css("display",""),t.html(e.description),jQuery(s).append(t)})}d.activePopUp=!1,Fabrik.fireEvent("fabrik.dbjoin.update",[d,e])}}}).post()},getSubOptions:function(){var e;switch(this.options.displayType){case"dropdown":case"multilist":e=this.element.getElements("option");break;case"checkbox":e=this.element.getElements("[data-role=suboption] input[type=checkbox]");break;case"radio":default:e=this.element.getElements("[data-role=suboption] input[type=radio]")}return e},getSubOptsRow:function(){var e;switch(this.options.displayType){case"dropdown":case"multilist":default:break;case"checkbox":case"radio":e=this.element.getElements("[data-role=fabrik-rowopts]")}return e},getOptionValues:function(){var e=this.getSubOptions(),t=[];return e.each(function(e){t.push(e.get("value"))}),t.unique()},appendInfo:function(e){var t=e.rowid,o=this,i={formid:this.options.popupform,rowid:t};new Request.JSON({url:"index.php?option=com_fabrik&view=form&format=raw",data:i,onSuccess:function(e){var i=e.data[o.options.key],t=e.data[o.options.label];switch(o.options.displayType){case"dropdown":case"multilist":var n=o.element.getElements("option").filter(function(e,t){if(e.get("value")===i)return"dropdown"===o.options.displayType?o.element.selectedIndex=t:e.selected=!0,!0});0===n.length&&o.addOption(i,t);break;case"auto-complete":case"checkbox":o.addOption(i,t);break;case"radio":default:0===(n=o.element.getElements(".fabrik_subelement").filter(function(e,t){if(e.get("value")===i)return e.checked=!0})).length&&o.addOption(i,t)}"null"!==typeOf(o.element)&&(o.element.fireEvent("change",new Event.Mock(o.element,"change")),o.element.fireEvent("blur",new Event.Mock(o.element,"blur")))}}).send()},watchSelect:function(){var e,t,i=this;if(e=this.getContainer()){var n=e.getElement(".toggle-selectoption");"null"!==typeOf(n)&&(n.addEvent("click",function(e){i.selectRecord(e)}),Fabrik.addEvent("fabrik.list.row.selected",function(e){i.options.listid.toInt()===e.listid.toInt()&&i.activeSelect&&(i.update(e.rowid),t=i.element.id+"-popupwin-select",Fabrik.Windows[t]&&Fabrik.Windows[t].close(),i.element.fireEvent("change",new Event.Mock(i.element,"change")),i.element.fireEvent("blur",new Event.Mock(i.element,"blur")))}),this.unactiveFn=function(){i.activeSelect=!1},window.addEvent("fabrik.dbjoin.unactivate",this.unactiveFn),this.selectThenAdd()),this.selectThenAdd()}},selectThenAdd:function(){Fabrik.addEvent("fabrik.block.added",function(e,t){t==="list_"+this.options.listid+this.options.listRef&&e.form.addEvent("click:relay(.addbutton)",function(e,t){e.preventDefault();var i=this.selectRecordWindowId();Fabrik.Windows[i].close(),this.start(e,!0)}.bind(this))}.bind(this))},destroy:function(){window.removeEvent("fabrik.dbjoin.unactivate",this.unactiveFn)},selectRecord:function(e){window.fireEvent("fabrik.dbjoin.unactivate"),this.activeSelect=!0,e.stop();var t=this.selectRecordWindowId(),i=this.getContainer().getElement("a.toggle-selectoption").href;i+="&format=partial",i+="&triggerElement="+this.element.id,i+="&resetfilters=1",i+="&c="+this.options.listRef;this.windowopts={id:t,modalId:"db_join_select",title:Joomla.JText._("PLG_ELEMENT_DBJOIN_SELECT"),contentType:"xhr",loadMethod:"xhr",evalScripts:!0,contentURL:i,width:this.options.windowwidth,height:320,minimizable:!1,collapsible:!0,onContentLoaded:function(){this.fitToContent(!1)}},Fabrik.getWindow(this.windowopts)},selectRecordWindowId:function(){return this.element.id+"-popupwin-select"},numChecked:function(){return"checkbox"!==this.options.displayType?null:this._getSubElements().filter(function(e){return"0"!==e.value&&e.checked}).length},update:function(e){if(this.getElement(),"null"!==typeOf(this.element)){if(!this.options.editable){if(this.element.set("html",""),""===e)return;"string"===typeOf(e)&&(e=JSON.parse(e));var t=this.form.getFormData();return"object"===typeOf(t)&&(t=$H(t)),void e.each(function(e){"null"!==typeOf(t.get(e))?this.element.innerHTML+=t.get(e)+"<br />":this.element.innerHTML+=e+"<br />"}.bind(this))}this.setValue(e)}},setValue:function(e){var t=!1;if("null"!==typeOf(this.element.options))for(var i=0;i<this.element.options.length;i++)if(this.element.options[i].value===e){t=this.element.options[i].selected=!0;break}t||("auto-complete"===this.options.displayType?(this.element.value=e,this.updateFromServer(e)):"dropdown"===this.options.displayType?this.options.show_please_select&&(this.element.options[0].selected=!0):("string"===typeOf(e)&&(e=""===e?[]:JSON.parse(e)),"array"!==typeOf(e)&&(e=[e]),this._getSubElements(),this.subElements.each(function(t){var i=!1;e.each(function(e){e.toString()===t.value&&(i=!0)}.bind(this)),t.checked=i}.bind(this)))),this.options.value=e,this.options.advanced&&jQuery("#"+this.element.id).trigger("liszt:updated")},updateByLabel:function(t){(this.getElement(),"null"!==typeOf(this.element))&&(this.options.editable&&"dropdown"===this.options.displayType||this.update(t),this.element.getElements("option").some(function(e){return e.text===t&&(this.update(e.value),!0)}.bind(this)))},showDesc:function(e){var t=e.target.selectedIndex,i=this.getContainer().getElement(".dbjoin-description"),n=i.getElement(".description-"+t);i.getElements(".notice").each(function(e){if(e===n){var t=new Fx.Tween(n,{property:"opacity",duration:400,transition:Fx.Transitions.linear});t.set(0),e.setStyle("display",""),t.start(0,1)}else e.setStyle("display","none")})},getValue:function(){var t=null;if(this.getElement(),!this.options.editable)switch(this.options.displayType){case"multilist":case"checkbox":return this.options.value;case"dropdown":case"auto-complete":case"radio":default:return jQuery.isArray(this.options.value)?0!==this.options.value.length?this.options.value.getLast():"":this.options.value}if("null"===typeOf(this.element))return"";switch(this.options.displayType){case"dropdown":default:return"null"===typeOf(this.element.get("value"))?"":this.element.get("value");case"multilist":var i=[];return this.element.getElements("option").each(function(e){e.selected&&i.push(e.value)}),i;case"auto-complete":return this.element.value;case"radio":return t="",this._getSubElements().each(function(e){return e.checked?t=e.get("value"):null}),t;case"checkbox":return t=[],this.getChxLabelSubElements().each(function(e){e.checked&&t.push(e.get("value"))}),t}},getChxLabelSubElements:function(){return this._getSubElements().filter(function(e){if(!e.name.contains("___id"))return!0})},getCloneName:function(){return this.options.element},getValues:function(){var t=[],e="dropdown"!==this.options.displayType?"input":"option";return document.id(this.element.id).getElements(e).each(function(e){t.push(e.value)}),t},cloned:function(e){this.activePopUp=!1,this.parent(e),this.init(),this.watchSelect(),"auto-complete"===this.options.displayType&&this.cloneAutoComplete()},cloneAutoComplete:function(){var e=this.getAutoCompleteLabelField();e.id=this.element.id+"-auto-complete",e.name=this.element.name.replace("[]","")+"-auto-complete",document.id(e.id).value="",new AutoComplete(this.element.id,this.options.autoCompleteOpts)},watchObserve:function(){var n,o;this.options.observe.each(function(i){""!==i&&(this.form.formElements[i]?this.form.formElements[i].addNewEventAux(this.form.formElements[i].getChangeEvent(),function(e){this.updateFromServer()}.bind(this)):this.options.canRepeat?(o=i+"_"+this.options.repeatCounter,this.form.formElements[o]&&this.form.formElements[o].addNewEventAux(this.form.formElements[o].getChangeEvent(),function(e){this.updateFromServer()}.bind(this))):this.form.repeatGroupMarkers.each(function(e,t){for(o="",n=0;n<e;n++)o="join___"+this.form.options.group_join_ids[t]+"___"+i+"_"+n,this.form.formElements[o]&&this.form.formElements[o].addNewEvent(this.form.formElements[o].getChangeEvent(),function(e){this.updateFromServer()}.bind(this))}.bind(this)))}.bind(this))},attachedToForm:function(){this.options.editable&&this.watchObserve(),this.parent()},init:function(){"null"!==typeOf(this.element)&&(this.options.editable&&this.getCheckboxTmplNode(),!0===this.options.allowadd&&!1!==this.options.editable&&(this.watchAddEvent=this.start.bind(this),this.watchAdd(),Fabrik.addEvent("fabrik.form.submitted",function(e,t){this.options.popupform===e.id&&(this.activePopUp&&(this.options.value=t.rowid),"auto-complete"===this.options.displayType?this.activePopUp&&new Request.JSON({url:"index.php?option=com_fabrik&view=form&format=raw",data:{formid:this.options.popupform,rowid:t.rowid},onSuccess:function(e){this.update(e.data[this.options.key])}.bind(this)}).send():this.updateFromServer())}.bind(this))),this.options.editable&&(this.watchSelect(),!0===this.options.showDesc&&this.element.addEvent("change",function(e){this.showDesc(e)}.bind(this))))},getAutoCompleteLabelField:function(){var e=this.element.getParent(".fabrikElement"),t=e.getElement("input[name*=-auto-complete]");return"null"===typeOf(t)&&(t=e.getElement("input[id*=-auto-complete]")),t},addNewEventAux:function(action,js){switch(this.options.displayType){case"dropdown":default:this.element&&this.element.addEvent(action,function(e){e&&e.stop(),"function"===typeOf(js)?js.delay(0,this,this):eval(js)}.bind(this));break;case"checkbox":case"radio":this._getSubElements(),this.subElements.each(function(el){el.addEvent(action,function(){"function"===typeOf(js)?js.delay(0,this,this):eval(js)}.bind(this))}.bind(this));break;case"auto-complete":var f=this.getAutoCompleteLabelField();"null"!==typeOf(f)?f.addEvent(action,function(e){e&&e.stop(),"function"===typeOf(js)?js.delay(700,this,this):eval(js)}.bind(this)):this.element&&this.element.addEvent(action,function(e){e&&e.stop(),"function"===typeOf(js)?js.delay(0,this,this):eval(js)}.bind(this))}},decreaseName:function(e){if("auto-complete"===this.options.displayType){var t=this.getAutoCompleteLabelField();"null"!==typeOf(t)&&(t.name=this._decreaseName(t.name,e,"-auto-complete"),t.id=this._decreaseId(t.id,e,"-auto-complete"))}return this.parent(e)},updateUsingRaw:function(){return!0},onsubmit:function(e){if(this.options.editable)switch(this.options.displayType){case"dropdown":case"multilist":jQuery("#"+this.element.id+" option:selected:disabled").prop("disabled",!1)}this.parent(e)}}),window.FbDatabasejoin});