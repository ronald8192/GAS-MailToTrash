function doGet() { 
	var myapp = UiApp.createApplication().setTitle('Delete your email');	
	var text = myapp.createTextBox().setName("subject");
	var handler = myapp.createServerHandler("MailToTrash").addCallbackElement(text);
	myapp.add(myapp.createLabel("Move your email to trash.").setId("banner1"));
	myapp.add(myapp.createLabel("By title(subject): ").setId("desc"));
	myapp.add(text);
	myapp.add(myapp.createButton("Delete email", handler));
	myapp.add(myapp.createLabel("").setId("logs"));
	
	myapp.add(myapp.createImage("https://raw.githubusercontent.com/ronald8192/GitHub-Mark/master/PNG/GitHub-Mark-32px.png").setSize(32, 32));
	myapp.add(myapp.createAnchor("GitHub", "https://github.com/ronald8192/GAS-MailToTrash"));
	return myapp;
}

function MailToTrash(eventInfo) {
	var app1 = UiApp.createApplication();
	app1.getElementById("logs").setText("");
	
	var deleteCount = 0;
	var threads = GmailApp.getInboxThreads(0, 500);
	
	for (var i = 0; i < threads.length; i++) {
		var subject = threads[i].getFirstMessageSubject();
		if(subject == eventInfo.parameter.subject){
			threads[i].moveToTrash();
			deleteCount++;
		}
	}
	app1.getElementById("logs").setText("Deleted " + deleteCount + " emails");
	return app1;
}
