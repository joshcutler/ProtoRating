// StarRating Class
// A superclass to work with simple CSS selectors, used for initialization
var StarRatings = Class.create();
StarRatings.prototype = {
	StarRating: function(selector, options) {
		var ratings = $$(selector);
		ratings.each( function(rating) {
			new StarRating(rating, options);
		});
	}
};

// Tooltip Class
var StarRating = Class.create();
StarRating.prototype = {
  initialize: function(el, options) {
    this.el = $(el)
    this.initialized = false;
		this.setOptions(options);
		this.el.addClassName('star-list');
		this.stars = this.el.descendants();
		
		handler_class = this
		this.stars.each( function(li) {
		  li.addClassName('star')
		  //Write the value
		  Element.writeAttribute(li, {value: li.innerHTML})
		  li.value = li.innerHTML
		  li.label_value = Element.readAttribute(li, "label")
		  li.innerHTML = ""
		  		  
		  li.observe("mouseover", handler_class.hover);
		  li.observe("mouseout", handler_class.unhover);
		  li.observe("click", handler_class.lock_in);
		  li.parent_class = handler_class;
		});
		
		this.reset();
  },
  setOptions: function(options) {
		this.options = {
		  value: 0,
		  label_id: null,         //Default value of this star rating
		  hidden_field_id: null   //Stores the value of the control
		};
		Object.extend(this.options, options || {});
	},
	hover: function(event){
	  element = event.element();
	  this.parent_class.drawState(element.getAttribute("value"))
	},
	unhover: function(event){
	  this.parent_class.reset();
	},
	lock_in: function(event){
	  element = event.element();
	  this.parent_class.options.value = element.getAttribute("value");
	  
	  this.parent_class.set_hidden_value(element.getAttribute("value"));
	},
	reset: function(){
	  this.drawState(this.options.value)
	  //Special case blank
	  if (this.options.value == 0)
	  {
	    this.drawLabel("")
	  }
	  this.set_hidden_value(this.options.value)
	},
	drawState: function(value){
	  this.stars.each( function(li) {
		  //Show the correct image
		  if (li.value <= parseInt(value))
		  {
		    li.removeClassName('unchecked')
		    li.addClassName('checked')
		  }
		  else
		  {
		    li.removeClassName('checked')
		    li.addClassName('unchecked')
		  }
		  
		  if (li.value == value)
		  {
		    li.parent_class.drawLabel(li.label_value)
		  }
		});
	},
	drawLabel: function(text)
	{
	  if (this.options.label_id)
		{
		  $(this.options.label_id).innerHTML = text
		}
	},
	set_hidden_value: function(value)
	{
	  if (this.options.hidden_field_id)
	  {
	    $(this.options.hidden_field_id).value = value
	  }
	}
}