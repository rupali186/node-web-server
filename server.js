const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT||3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log('Unable to append to server.log');
		}
	})
	next();
});
// app.use((req,res,next)=>{
// 	res.render('maintenence.hbs',{
// 		pageTitle:'Maintenece Page',
// 		message:'This site is under maintenence'
// 	});
// });
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageTitle:'Home Page',
		message:'Welcome to our site'
	})
});
app.listen(port,()=>{
	console.log(`server is up on port ${3000}`);
});
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
	});
});
app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pageTitle:'Portfolio Page',
		message:'Welcome to portfolio'
	});
});
app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'bad request'
	})
});