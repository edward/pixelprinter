// Called when the order is shown, and each time a template checkbox has changed
function checkSelectedTemplates(order) {
	checkAllTemplatePreviews(order);
	togglePrintButton();
}

function togglePrintButton() {
	var selected = $("#selected-templates :checkbox:checked").length;
  if (selected > 0) {
    $("#print-button").show();
  } else {
    $("#print-button").hide();
  }
}

function checkAllTemplatePreviews(order) {
	$("#selected-templates :checkbox").each(function() {
		toggleTemplatePreview(order, this);
	});
}

// Shows the rendered preview for a template if the corresponding checkbox is selected, else it hides it.
// If the preview has not already been rendered it inserts it via AJAX, else it just shows the hidden preview.
function toggleTemplatePreview(order, checkbox) {
	var	template = checkbox.value;
	var templatePreview = $("#template-preview-" + template);
  if (checkbox.checked == true && checkbox.disabled == false) {
    if (templatePreview.length == 1) { 
      templatePreview.show();
    } else { 
			checkbox.disable();
			$("#preview-status").show();
      $("#preview-" + template).load("/print_templates/preview?id=" + template + "&order_id=" + order, 
																		null, function() { $("#preview-status").hide(); checkbox.enable();});
    }
  } else { 
    templatePreview.hide();
  }
}


function togglePreviewLinkStatus(active) {
	if (active) {
		$("#main-buttons").hide();
		$("#preview-status").show();
	} else {
		$("#main-buttons").show();
		$("#preview-status").hide();
	}
}


function addTemplateSelectorOptions(selectedTemplate, order, templateIDs, templateNames) {
	var selecta = $("#template-selector");
	var selections = jQuery.map(templateIDs, function(id, index){
		return "<option value='" + id + "'" + (selectedTemplate == id ? " selected=true" : "") +  ">" + templateNames[index] + "</option>";
	});
	selecta.html(selections.join(" "));
	
	selecta.bind('change', function(e) {
		var template = e.target.value;
		$("#preview-status").show();
		selecta.disable();
		$("#facebox .content").load("/print_templates/preview?id=" + template + "&order_id=" + order, 
			null, function() { $("#preview-status").hide(); selecta.enable(); } 
		);
	});
}